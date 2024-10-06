import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import ClassroomsPage from "@/pages/user/classrooms/ClassroomsPage";

const classroomsRoute = [
  {
    path: "/classrooms",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ClassroomsPage />,
      },
    ],
  },
];

export default classroomsRoute;
