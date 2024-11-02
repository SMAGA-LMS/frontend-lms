import UserRolesEnum from "@/enums/UserRoleEnum";
import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import AddNewClassRoomPage from "@/pages/user/classrooms/AddNewClassroomPage";
import ClassroomsPage from "@/pages/user/classrooms/ClassroomsPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import ClassroomDetailPage from "@/pages/user/classrooms/ClassroomDetailPage";
import PeopleEnrolledClassroomPage from "@/pages/user/classrooms/PeopleEnrolledClassroomPage";

const classroomsRoute = [
  {
    path: "/classrooms",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<ClassroomsPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":id",
        element: withRoleBasedRoute(<ClassroomDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":id/people",
        element: withRoleBasedRoute(<PeopleEnrolledClassroomPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewClassRoomPage />, [
          UserRolesEnum.ADMIN,
        ]),
      },
    ],
  },
];

export default classroomsRoute;
