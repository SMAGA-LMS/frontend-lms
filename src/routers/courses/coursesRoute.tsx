import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import CoursesPage from "@/pages/user/courses/CoursesPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";

const coursesRoute = [
  {
    path: "/courses",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<CoursesPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
    ],
  },
];

export default coursesRoute;
