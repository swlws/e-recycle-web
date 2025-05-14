import React, { useState } from 'react';
import './index.scss';
import api from '@/api';
import CacheMgr from '@/cache';
import { message } from 'antd'; // 导入 message 组件
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.auth.login({ account, password, auth: 'password' }).then((res) => {
      if (res.r0 === 0) {
        CacheMgr.token.setValue(res.res);
        messageApi.open({
          type: 'success',
          content: '登录成功',
          duration: 2,
        });

        navigate('/'); // 使用 navigate 函数导航到根路径
      } else {
        messageApi.open({
          type: 'error',
          content: '用户名或密码错误',
          duration: 2,
        });
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-content">
        {contextHolder}
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>欢迎登录</h2>
          <div className="form-group">
            <label htmlFor="account">账号</label>
            <input
              type="text"
              id="account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">记住我</label>
            </div>
            <a href="/forgot-password" className="forgot-password">
              忘记密码?
            </a>
          </div> */}
          <button type="submit" className="login-button">
            登录
          </button>
          {/* <div className="signup-link">
            还没有账号? <a href="/signup">立即注册</a>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
