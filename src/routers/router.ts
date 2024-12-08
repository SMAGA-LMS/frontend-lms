import { createBrowserRouter } from "react-router-dom";
import guestRoutes from "./guest/guestRoutes";

import homeRoutes from "./home/homeRoutes";
import courseRoutes from "./courses/courseRoutes";
import classroomRoutes from "./classrooms/classroomRoutes";
import userRoutes from "./users/userRoutes";
import profileRoutes from "./profile/profileRoutes";
import classEnrollmentRoutes from "./class-enrollments/classEnrollmentRoutes";
import courseModuleRoutes from "./course-modules/courseModuleRoutes";
import classEnrollmentModuleRoutes from "./class-enrollment-modules/classEnrollmentModuleRoutes";
import attendanceRoutes from "./attendances/attendanceRoutes";
import announcementReceiverRoutes from "./announcement-receivers/announcementReceiverRoutes";

export const router = createBrowserRouter([
  // guest
  ...guestRoutes,

  // logged user
  ...homeRoutes,
  ...courseRoutes,
  ...classroomRoutes,
  ...userRoutes,
  ...profileRoutes,
  ...classEnrollmentRoutes,
  ...courseModuleRoutes,
  ...classEnrollmentModuleRoutes,
  ...attendanceRoutes,
  ...announcementReceiverRoutes,

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
