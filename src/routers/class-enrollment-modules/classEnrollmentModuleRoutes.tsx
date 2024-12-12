import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import CourseModulesStarterKitPage from "@/pages/user/class-enrollments/modules/CourseModulesStarterKitPage";
import ClassEnrollmentModuleDetailPage from "@/pages/user/class-enrollments/modules/ClassEnrollmentModuleDetailPage";
import AddNewClassEnrollmentModulePage from "@/pages/user/class-enrollments/modules/AddNewClassEnrollmentModulePage";
import ClassEnrollmentModulesPage from "@/pages/user/class-enrollments/modules/ClassEnrollmentModulesPage";
import CourseModuleStarterKitDetailPage from "@/pages/user/class-enrollments/modules/CourseModuleStarterKitDetailPage";

const classEnrollmentModuleRoutes = [
  {
    path: "/class-enrollments/:id/modules",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<ClassEnrollmentModulesPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "starter-kit",
        element: withRoleBasedRoute(<CourseModulesStarterKitPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "starter-kit/:courseModuleID",
        element: withRoleBasedRoute(<CourseModuleStarterKitDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":classEnrollmentModuleID",
        element: withRoleBasedRoute(<ClassEnrollmentModuleDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewClassEnrollmentModulePage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
        ]),
      },
    ],
  },
];

export default classEnrollmentModuleRoutes;
