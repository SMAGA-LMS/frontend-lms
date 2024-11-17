import MemberLayout from "@/layouts/MemberLayout";
import ErrorPage from "@/pages/ErrorPage";
import ProfilePage from "@/pages/user/profile/ProfilePage";

const profileRoutes = [
  {
    path: "/profile",
    element: <MemberLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
  },
];

export default profileRoutes;
