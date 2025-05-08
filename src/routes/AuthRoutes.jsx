import { lazy } from "react";
import MinimalLayout from "../layout/MinimalLayout";
import { Loadable } from "../components/controls";
const Login = Loadable(lazy(() => import("../pages/Login")));
const Signup = Loadable(lazy(() => import("../pages/Signup")));

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ],
};

export default AuthenticationRoutes;
