import GuestLayout from "@/layouts/GuestLayout";
import ErrorPage from "@/pages/ErrorPage";
import { Navigate } from "react-router-dom";
import LoginPage from "@/pages/login/LoginPage";

const guestRoute = [
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={"/login"} replace />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
];

export default guestRoute;
