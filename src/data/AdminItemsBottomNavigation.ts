import iconHome from "../assets/icons/bottom-navigation/home.svg";
import iconCourses from "../assets/icons/bottom-navigation/courses.svg";
import iconClassrooms from "../assets/icons/bottom-navigation/classrooms.svg";
import iconUsers from "../assets/icons/bottom-navigation/users.svg";
import iconProfile from "../assets/icons/bottom-navigation/profile.svg";

const AdminItemsBottomNavigation = [
  {
    icon: iconHome,
    label: "Home",
    slug: "/home",
  },
  {
    icon: iconCourses,
    label: "Courses",
    slug: "/courses",
  },
  {
    icon: iconClassrooms,
    label: "Class List",
    slug: "/classrooms",
  },
  {
    icon: iconUsers,
    label: "User List",
    slug: "/users",
  },
  {
    icon: iconProfile,
    label: "Profile",
    slug: "/profile",
  },
];

export default AdminItemsBottomNavigation;
