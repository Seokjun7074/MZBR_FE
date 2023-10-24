import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import IntroPage from '@/pages/IntroPage/IntroPage';
import SignupPage from '@/pages/SignupPage/SignupPage';

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
      children: [
        {
          path: PATH.SIGNUP,
          element: <SignupPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
