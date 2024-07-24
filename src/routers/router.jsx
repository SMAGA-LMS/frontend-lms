import ErrorPage from "@/components/ui/ErrorPage";
import AdminBottomNavLayout from "@/layouts/AdminBottomNavLayout";
import GuestLayout from "@/layouts/GuestLayout";
import LoginScreen from "@/pages/login/LoginScreen";
import ClassesScreen from "@/pages/user/classes/ClassesScreen";
import CoursesScreen from "@/pages/user/courses/CoursesScreen";
import HomeScreen from "@/pages/user/home/HomeScreen";
import ProfileScreen from "@/pages/user/profile/ProfileScreen";
import UserListScreen from "@/pages/user/user-list/UserListScreen";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/login"} replace />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminBottomNavLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={"/admin/home"} replace />,
      },
      {
        path: "home",
        element: <HomeScreen />,
      },
      {
        path: "courses",
        element: <CoursesScreen />,
      },
      {
        path: "classes",
        element: <ClassesScreen />,
      },
      {
        path: "user-list",
        element: <UserListScreen />,
      },
      {
        path: "profile",
        element: <ProfileScreen />,
      },
    ],
  },
]);
