import ErrorPage from "@/pages/ErrorPage";
import ClassEnrollmentsPage from "@/pages/user/class-enrollments/ClassEnrollmentsPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import MemberLayout from "@/layouts/MemberLayout";
import AddNewClassEnrollmentPage from "@/pages/user/class-enrollments/AddNewClassEnrollmentPage";
import ClassEnrollmentDetailPage from "@/pages/user/class-enrollments/ClassEnrollmentDetailPage";
import AssignNewTeacherToClassEnrollmentPage from "@/pages/user/class-enrollments/people/AssignNewTeacherToClassEnrollmentPage";
import PeopleEnrolledClassEnrollmentPage from "@/pages/user/class-enrollments/people/PeopleEnrolledClassEnrollmentPage";

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
        path: ":id",
        element: withRoleBasedRoute(<ClassEnrollmentDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":id/people",
        element: withRoleBasedRoute(<PeopleEnrolledClassEnrollmentPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":id/people/assign-teacher",
        element: withRoleBasedRoute(<AssignNewTeacherToClassEnrollmentPage />, [
          UserRolesEnum.ADMIN,
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
