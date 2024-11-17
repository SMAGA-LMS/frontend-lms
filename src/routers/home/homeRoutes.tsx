import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/user/home/HomePage";

const homeRoutes = [
  {
    path: "/home",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default homeRoutes;
