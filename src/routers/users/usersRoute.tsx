import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import RoleBasedRoute from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import UsersPage from "@/pages/user/users/UsersPage";

const usersRoute = [
  {
    path: "/users",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <RoleBasedRoute allowedRoles={[UserRolesEnum.ADMIN]}>
            <UsersPage />
          </RoleBasedRoute>
        ),
      },
    ],
  },
];

export default usersRoute;
