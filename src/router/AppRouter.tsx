import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Intro from '@/pages/Intro/Intro';

import { PATH } from '@/constants/path';

import App from '@/App';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <Intro />,
    },
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <></>,
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
