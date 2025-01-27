import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginNew from './pages/account/login-new';
import Dashboard from './pages/dashboard/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from './pages/account/new-user';
import ForgotPassword from './pages/account/forgot';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: 'account',
      children: [
        {
          path: 'login',
          element: <LoginNew />
        },
        {
          path: 'create',
          element: <NewUser />
        },
        {
          path: 'forgot',
          element: <ForgotPassword />
        }
      ]
    },
  ]);

  return (
    <div className="App App d-flex flex-column min-vh-100">
        <RouterProvider router={router}></RouterProvider>
        <Outlet/>
    </div>
  );
}
//https://dribbble.com/tags/health-care-dashboard
//https://www.youtube.com/watch?v=Zujd8BSCJ2U
export default App;
