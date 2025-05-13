import React, { useState } from 'react';
import './index.scss';

const Login: React.FC = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe /*setRememberMe*/] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里处理登录逻辑
    console.log({ account, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-content">
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
