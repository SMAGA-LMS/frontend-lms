import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import CourseModulesPage from "@/pages/user/courses/modules/CourseModulesPage";
import AddNewCourseModulePage from "@/pages/user/courses/modules/AddNewCourseModulePage";
import CourseModuleDetailPage from "@/pages/user/courses/modules/CourseModuleDetailPage";

const courseModuleRoutes = [
  {
    path: "/courses/:id/modules",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<CourseModulesPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
        ]),
      },
      {
        path: ":courseModuleID",
        element: withRoleBasedRoute(<CourseModuleDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewCourseModulePage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
        ]),
      },
    ],
  },
];

export default courseModuleRoutes;
