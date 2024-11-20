import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import CourseModulesPage from "@/pages/user/courses/modules/CourseModulesPage";
import AddNewCourseModulePage from "@/pages/user/courses/modules/AddNewCourseModulePage";
import ModuleDetailPage from "@/pages/user/modules/ModuleDetailPage";

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
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":moduleID",
        element: withRoleBasedRoute(<ModuleDetailPage />, [
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
