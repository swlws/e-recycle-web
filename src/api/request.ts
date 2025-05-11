import axios from "axios";
import type { AxiosResponse } from "axios";
import CacheMgr from "../cache";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestOptions {
  method: Method;
  header: Record<string, any>;
  // 自定义的 apiName
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

// export const URL_PREFIX = "http://localhost:8808";
export const URL_PREFIX = "https://dev.swlws.site";
const DEFAULT_METHOD = "GET";
const DEFAULT_HEADER = {
  "Content-Type": "application/json",
};

function request(
  url: string,
  data: Record<string, any>,
  options: RequestOptions
) {
  const uid = CacheMgr.user.value?._id || "";
  const env = CacheMgr.env.value || "";

  const method = options.method || DEFAULT_METHOD;
  const headers = {
    ...DEFAULT_HEADER,
    ...options.header,
    "X-UID": uid,
    "X-ENV": env,
  };

  return axios({
    url: `${URL_PREFIX}${url}`,
    method: method.toLowerCase(),
    headers,
    data: method !== "GET" ? data : undefined,
    params: method === "GET" ? data : undefined,
    timeout: 60000,
  })
    .then((response) => {
      return responseInterceptor(response, options);
    })
    .catch((err) => {
      if (!options?.header?.ignoreErrorTip) {
        // 这里可以使用你的提示组件，比如 antd 的 message
        console.error("网络错误");
      }
      return Promise.reject(err);
    });
}

function responseInterceptor(response: AxiosResponse, options: RequestOptions) {
  if (response.status === 200) {
    const { r0, r1, res } = response.data;

    // 允许显示错误信息
    if (!options?.header?.ignoreErrorTip) {
      if (r0 !== 0 && r1) {
        // 这里可以使用你的提示组件，比如 antd 的 message
        console.error(r1);
      }
    }

    return { r0, r1, res };
  } else {
    return Promise.reject(response);
  }
}

const api = {} as Record<Method, ApiMethod>;
(["GET", "POST", "PUT", "DELETE"] as Method[]).forEach((method) => {
  api[method] = (
    url: string,
    data: Record<string, any>,
    options: RequestOptions = {} as RequestOptions
  ) => {
    return request(url, data, { ...options, method });
  };
});

export default api;
