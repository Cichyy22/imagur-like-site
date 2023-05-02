import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage, {
  action as authAction,
} from './pages/Auth';
import { checkAuthLoader, tokenLoader } from './util/auth';
import "./App.css";
import {action as logoutAction} from './pages/logout'
import FavPage from './pages/Favourites';
import AddPage, {action as postAction} from './pages/NewImg';
import ImgPage from './pages/ImgPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <LoginPage />, action: authAction },
      { path: 'logout',action: logoutAction},
      { path: 'fav', element: <FavPage />, loader: checkAuthLoader,},
      { path: 'add', element: <AddPage />, loader: checkAuthLoader, action: postAction},
      {
        path: '/post/:imgId',
        element: <ImgPage />,
        loader: tokenLoader
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
