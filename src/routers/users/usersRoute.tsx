import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import RoleBasedRoute from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import UsersPage from "@/pages/user/users/UsersPage";
import AddNewUserScreen from "@/pages/user/users/AddNewUserPage";

const withRoleBasedRoute = (
  element: JSX.Element,
  allowedRoles: UserRolesEnum[]
) => <RoleBasedRoute allowedRoles={allowedRoles}>{element}</RoleBasedRoute>;

const usersRoute = [
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
        element: withRoleBasedRoute(<AddNewUserScreen />, [
          UserRolesEnum.ADMIN,
        ]),
      },
    ],
  },
];

export default usersRoute;
