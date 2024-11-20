import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import CoursesPage from "@/pages/user/courses/CoursesPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import CourseDetailPage from "@/pages/user/courses/CourseDetailPage";
import AddNewCoursePage from "@/pages/user/courses/AddNewCoursePage";
import AssignNewTeacherToCoursePage from "@/pages/user/courses/AssignNewTeacherToCoursePage";

const courseRoutes = [
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
        ]),
      },
      {
        path: ":id",
        element: withRoleBasedRoute(<CourseDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":id/assign-teacher",
        element: withRoleBasedRoute(<AssignNewTeacherToCoursePage />, [
          UserRolesEnum.ADMIN,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewCoursePage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
    ],
  },
];

export default courseRoutes;
