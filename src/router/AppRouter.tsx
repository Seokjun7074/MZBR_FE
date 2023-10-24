import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import IntroPage from '@/pages/IntroPage/IntroPage';

import { PATH } from '@/constants/path';

import App from '@/App';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <IntroPage />,
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
