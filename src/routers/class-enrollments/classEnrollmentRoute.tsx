import ErrorPage from "@/pages/ErrorPage";
import ClassEnrollmentsPage from "@/pages/user/class-enrollments/ClassEnrollmentsPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import MemberLayout from "@/layouts/MemberLayout";
import AddNewClassEnrollmentPage from "@/pages/user/class-enrollments/AddNewClassEnrollmentPage";

const classEnrollmentRoutes = [
  {
    path: "/class-enrollments",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<ClassEnrollmentsPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewClassEnrollmentPage />, [
          UserRolesEnum.ADMIN,
        ]),
      },
    ],
  },
];

export default classEnrollmentRoutes;
