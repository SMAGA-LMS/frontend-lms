import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import CoursesPage from "@/pages/user/courses/CoursesPage";

const coursesRoute = [
  {
    path: "/courses",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CoursesPage />,
      },
    ],
  },
];

export default coursesRoute;
