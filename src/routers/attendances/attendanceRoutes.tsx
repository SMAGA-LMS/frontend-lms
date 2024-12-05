import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import AttendancesPage from "@/pages/user/attendances/AttendancesPage";
import SessionRecordsPage from "@/pages/user/class-enrollments/attendances/SessionRecordsPage";
import SessionRecordDetailPage from "@/pages/user/class-enrollments/attendances/SessionRecordDetailPage";
import AddNewSessionRecordAttendancesPage from "@/pages/user/class-enrollments/attendances/AddNewSessionRecordAttendancesPage";

const attendanceRoutes = [
  {
    path: "/attendances",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<AttendancesPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
    ],
  },
  {
    path: "/class-enrollments/:id/attendances",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<SessionRecordsPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":sessionRecordID",
        element: withRoleBasedRoute(<SessionRecordDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewSessionRecordAttendancesPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
        ]),
      },
    ],
  },
];

export default attendanceRoutes;
