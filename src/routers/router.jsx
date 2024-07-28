import ErrorPage from "@/components/ui/ErrorPage";
import AdminBottomNavLayout from "@/layouts/AdminBottomNavLayout";
import GuestLayout from "@/layouts/GuestLayout";
import MemberLayout from "@/layouts/MemberLayout";
import LoginScreen from "@/pages/login/LoginScreen";
import AddNewClassPeriodScreen from "@/pages/user/class-periods/AddNewClassPeriodScreen";
import AddNewStudentToClassPeriodScreen from "@/pages/user/class-periods/AddNewStudentToClassPeriodScreen";
import ClassPeriodDetailScreen from "@/pages/user/class-periods/ClassPeriodDetailScreen";
import ClassPeriodsScreen from "@/pages/user/class-periods/ClassPeriodsScreen";
import PeopleEnrolledScreen from "@/pages/user/class-periods/PeopleEnrolledScreen";

import CoursesScreen from "@/pages/user/courses/CoursesScreen";
import HomeScreen from "@/pages/user/home/HomeScreen";
import ProfileScreen from "@/pages/user/profile/ProfileScreen";
import AddNewUserScreen from "@/pages/user/users/AddNewUserScreen";
import UsersScreen from "@/pages/user/users/UsersScreen";
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
    path: "/",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={"/admin/home"} replace />,
      },
      {
        path: "admin",
        element: <AdminBottomNavLayout />,
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
            path: "class-periods",
            element: <ClassPeriodsScreen />,
          },
          {
            path: "users",
            element: <UsersScreen />,
          },
          {
            path: "profile",
            element: <ProfileScreen />,
          },
        ],
      },
      {
        path: "admin/class-periods",
        children: [
          {
            path: "new",
            element: <AddNewClassPeriodScreen />,
          },
          {
            path: "detail",
            children: [
              {
                index: true,
                element: <ClassPeriodDetailScreen />,
              },
              {
                path: "people",
                children: [
                  {
                    index: true,
                    element: <PeopleEnrolledScreen />,
                  },
                  {
                    path: "new",
                    element: <AddNewStudentToClassPeriodScreen />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "admin/users",
        children: [
          {
            path: "new",
            element: <AddNewUserScreen />,
          },
        ],
      },
    ],
  },
]);
