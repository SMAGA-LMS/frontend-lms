import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import UsersPage from "@/pages/user/users/UsersPage";
import AddNewUserPage from "@/pages/user/users/AddNewUserPage";

const userRoutes = [
  {
    path: "/users",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<UsersPage />, [UserRolesEnum.ADMIN]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewUserPage />, [UserRolesEnum.ADMIN]),
      },
    ],
  },
];

export default userRoutes;
