import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux"
import { selectUser } from "../redux/Auth/Selectors";
import { Image404 } from "../assets/images/404";
import LoginRoutes from "./AuthRoutes";
import PrivateRoute from "./PrivateRoute";
import DoctorRoutes from "./DoctorRoutes";
import PatientRoutes from "./PatientRoute";
import { USER_ROLES } from "../utils/constant";

const NotFoundPage = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Image404 />
  </div>
);

const AppRouter = () => {
  const user = useSelector(selectUser);
  const role = user?.user_type;

  const createRoutes = (role) => {
    switch (role) {
      case USER_ROLES.DOCTOR:
        return [DoctorRoutes, LoginRoutes];
      case USER_ROLES.PATIENT:
        return [PatientRoutes, LoginRoutes];
      default:
        return [LoginRoutes];
    }
  };

  const router = createBrowserRouter(
    [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      ...createRoutes(role),
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
    {
      basename: import.meta.env.VITE_APP_BASE_NAME,
    }
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
