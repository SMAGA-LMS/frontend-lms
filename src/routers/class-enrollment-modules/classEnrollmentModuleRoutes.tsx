import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import CourseModulesStarterKitPage from "@/pages/user/class-enrollments/modules/CourseModulesStarterKitPage";
import ClassEnrollmentModuleDetailPage from "@/pages/user/class-enrollments/modules/ClassEnrollmentModuleDetailPage";
import AddNewClassEnrollmentModulePage from "@/pages/user/class-enrollments/modules/AddNewClassEnrollmentModulePage";

const classEnrollmentModuleRoutes = [
  {
    path: "/class-enrollments/:id/modules",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<CourseModulesStarterKitPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":moduleID",
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
