import UserRolesEnum from "@/enums/UserRoleEnum";
import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import AddNewClassRoomPage from "@/pages/user/classrooms/AddNewClassroomPage";
import ClassroomsPage from "@/pages/user/classrooms/ClassroomsPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import ClassroomDetailPage from "@/pages/user/classrooms/ClassroomDetailPage";
import PeopleEnrolledClassroomPage from "@/pages/user/classrooms/people/PeopleEnrolledClassroomPage";
import AssignNewStudentToClassroomPage from "@/pages/user/classrooms/people/AssignNewStudentToClassroomPage";

const classroomRoutes = [
  {
    path: "/classrooms",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<ClassroomsPage />, [UserRolesEnum.ADMIN]),
      },
      {
        path: ":id",
        element: withRoleBasedRoute(<ClassroomDetailPage />, [
          UserRolesEnum.ADMIN,
        ]),
      },
      {
        path: ":id/people",
        element: withRoleBasedRoute(<PeopleEnrolledClassroomPage />, [
          UserRolesEnum.ADMIN,
        ]),
      },
      {
        path: ":id/people/assign-student",
        element: withRoleBasedRoute(<AssignNewStudentToClassroomPage />, [
          UserRolesEnum.ADMIN,
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

export default classroomRoutes;
