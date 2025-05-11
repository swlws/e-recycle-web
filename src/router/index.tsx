import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// 懒加载组件
const Layout = lazy(() => import('../layout/main/index')); // 你需要创建一个 Layout 组件
const Home = lazy(() => import('../views/home'));
const Login = lazy(() => import('../views/login'));
const UserCenter = lazy(() => import('../views/user-center'));
const TaskCenter = lazy(() => import('../views/task-center'));
const ScoreCenter = lazy(() => import('../views/score-center'));

// 路由加载时的占位组件
const Loading = () => <div>加载中...</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true, // 默认子路由（/）
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'user',
        element: (
          <Suspense fallback={<Loading />}>
            <UserCenter />
          </Suspense>
        ),
      },
      {
        path: 'task',
        element: (
          <Suspense fallback={<Loading />}>
            <TaskCenter />
          </Suspense>
        ),
      },
      {
        path: 'score',
        element: (
          <Suspense fallback={<Loading />}>
            <ScoreCenter />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
]);
