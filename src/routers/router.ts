import { createBrowserRouter } from "react-router-dom";
import guestRoute from "./guest/guestRoute";
import homeRoute from "./home/homeRoute";
import coursesRoute from "./courses/coursesRoute";
import classroomsRoute from "./classrooms/classroomsRoute";
import usersRoute from "./users/usersRoute";
import profileRoute from "./profile/profileRoute";

export const router = createBrowserRouter([
  // guest
  ...guestRoute,

  // logged user
  ...homeRoute,
  ...coursesRoute,
  ...classroomsRoute,
  ...usersRoute,
  ...profileRoute,
  // {
  //   path: "/",
  //   element: <MemberLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to={"/admin/home"} replace />,
  //     },
  //     {
  //       path: "/admin",
  //       element: <AdminBottomNavLayout />,
  //       children: [
  //         {
  //           index: true,
  //           element: <Navigate to={"/admin/home"} replace />,
  //         },
  //         {
  //           path: "home",
  //           element: <HomeScreen />,
  //         },
  //         {
  //           path: "courses",
  //           element: <CoursesScreen />,
  //         },
  //         {
  //           path: "class-periods",
  //           element: <ClassPeriodsScreen />,
  //         },
  //         {
  //           path: "users",
  //           element: <UsersScreen />,
  //         },
  //         {
  //           path: "profile",
  //           element: <ProfileScreen />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "class-periods",
  //       children: [
  //         {
  //           path: "new",
  //           element: <AddNewClassPeriodScreen />,
  //         },
  //         {
  //           path: ":classPeriodCode",
  //           children: [
  //             {
  //               index: true,
  //               element: <ClassPeriodDetailScreen />,
  //             },
  //             {
  //               path: "people",
  //               children: [
  //                 {
  //                   index: true,
  //                   element: <PeopleEnrolledScreen />,
  //                 },
  //                 {
  //                   path: "new",
  //                   element: <AddNewStudentToClassPeriodScreen />,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: "users",
  //       children: [
  //         {
  //           path: "new",
  //           element: <AddNewUserScreen />,
  //         },
  //       ],
  //     },
  //     // nanti di sini path: "courses"
  //   ],
  // },
]);
