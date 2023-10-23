import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '@/App';
import { PATH } from '@/constants/path';
import Intro from '@/pages/Intro/Intro';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <App />,
      errorElement: <></>,
      children: [
        {
          path: '',
          element: <Intro />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
