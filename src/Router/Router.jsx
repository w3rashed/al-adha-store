import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import UserInfo from "../Pages/UserInfo/UserInfo";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import FristOtp from "../Pages/FristOtp/FristOtp";
import UserDetails from "../Pages/UserDetails/UserDetails";
import NafathOne from "../Pages/NafathOne/NafathOne";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/userInfo",
        element: <UserInfo></UserInfo>,
      },
      {
        path: "/number-verification",
        element: <FristOtp></FristOtp>,
      },
      {
        path: "/userDetails",
        element: <UserDetails></UserDetails>,
      },
      {
        path: "/nafathOne",
        element: <NafathOne></NafathOne>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
