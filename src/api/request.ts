import axios from 'axios';
import type { AxiosResponse } from 'axios';
import CacheMgr from '../cache';
import { message } from 'antd'; // 导入 message 组件
import { router } from '@/router';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOptions {
  method: Method;
  header: Record<string, any>;
  _apiName?: string;
  ignoreErrorTip?: boolean;
}

type ApiMethod = (
  url: string,
  data: Record<string, any>,
  options?: RequestOptions
) => Promise<{
  r0: number;
  r1: string;
  res: any;
}>;

export const URL_PREFIX = '';
const DEFAULT_METHOD = 'GET';
const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
  'X-PLATFORM': 'web',
  'X-USE-TOKEN': 'true',
};

function request(url: string, data: Record<string, any>, options: RequestOptions) {
  const uid = CacheMgr.user.value?._id || '';
  const env = CacheMgr.env.value || '';
  const token = CacheMgr.token.value || '';

  const method = options.method || DEFAULT_METHOD;
  const headers = {
    ...DEFAULT_HEADER,
    ...options.header,
    'X-UID': uid,
    'X-ENV': env,
    'X-TOKEN': token,
    'X-PLATFORM': 'web',
    'X-USE-TOKEN': 'true',
  };

  return axios({
    url: `${URL_PREFIX}${url}`,
    method: method.toLowerCase(),
    headers,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined,
    timeout: 60000,
  })
    .then((response) => {
      return responseInterceptor(response, options);
    })
    .catch((err) => {
      if (!options?.header?.ignoreErrorTip) {
        message.error('网络错误');
      }
      return Promise.reject(err);
    });
}

function responseInterceptor(response: AxiosResponse, options: RequestOptions) {
  // 自动更新 token
  const nextToken = response.headers['X-NEXT-TOKEN'];
  if (nextToken) {
    CacheMgr.token.setValue(nextToken);
  }

  if (response.status === 200) {
    const { r0, r1, res } = response.data;

    if (r0 === 401) {
      CacheMgr.token.clear();
      router.navigate('/login'); // 使用 router.navigate 进行页面跳转
      return Promise.reject(new Error('未登录'));
    }

    if (!options?.header?.ignoreErrorTip) {
      if (r0 !== 0 && r1) {
        message.error(r1);
      }
    }

    return { r0, r1, res };
  } else {
    return Promise.reject(response);
  }
}

const api = {} as Record<Method, ApiMethod>;
(['GET', 'POST', 'PUT', 'DELETE'] as Method[]).forEach((method) => {
  api[method] = (
    url: string,
    data: Record<string, any>,
    options: RequestOptions = {} as RequestOptions
  ) => {
    return request(url, data, { ...options, method });
  };
});

export default api;
