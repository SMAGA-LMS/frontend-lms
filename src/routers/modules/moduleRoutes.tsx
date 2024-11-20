import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import ModulesPage from "@/pages/user/courses/modules/ModulesPage";
import AddNewModulePage from "@/pages/user/courses/modules/AddNewModulePage";

const moduleRoutes = [
  {
    path: "/courses/:id/modules",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<ModulesPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewModulePage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
        ]),
      },
    ],
  },
];

export default moduleRoutes;
