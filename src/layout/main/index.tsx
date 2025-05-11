import { Outlet, Link, useLocation } from 'react-router-dom';
import './index.scss'; // 推荐写样式到独立文件中

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="logo">后台系统</div>
        <nav className="nav-menu">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            首页
          </Link>
          <Link to="/user" className={location.pathname === '/user' ? 'active' : ''}>
            用户中心
          </Link>
          <Link to="/task" className={location.pathname === '/task' ? 'active' : ''}>
            任务中心
          </Link>
          <Link to="/score" className={location.pathname === '/score' ? 'active' : ''}>
            积分中心
          </Link>
        </nav>
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
