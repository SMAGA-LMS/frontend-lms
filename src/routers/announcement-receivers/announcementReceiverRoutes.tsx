import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import { withRoleBasedRoute } from "../RoleBasedRoute";
import UserRolesEnum from "@/enums/UserRoleEnum";
import AnnouncementReceiversPage from "@/pages/user/announcement-receivers/AnnouncementReceiversPage";
import AnnouncementReceiverDetailPage from "@/pages/user/announcement-receivers/AnnouncementReceiverDetailPage";
import AddNewAnnouncementReceiverPage from "@/pages/user/announcement-receivers/AddNewAnnouncementReceiverPage";

const announcementReceiverRoutes = [
  {
    path: "/announcement-receivers",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withRoleBasedRoute(<AnnouncementReceiversPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: ":id",
        element: withRoleBasedRoute(<AnnouncementReceiverDetailPage />, [
          UserRolesEnum.ADMIN,
          UserRolesEnum.TEACHER,
          UserRolesEnum.STUDENT,
        ]),
      },
      {
        path: "create",
        element: withRoleBasedRoute(<AddNewAnnouncementReceiverPage />, [
          UserRolesEnum.ADMIN,
        ]),
      },
    ],
  },
];

export default announcementReceiverRoutes;
