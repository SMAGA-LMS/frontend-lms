import iconHome from "../assets/icons/bottom-navigation/home.svg";
import iconCourses from "../assets/icons/bottom-navigation/courses.svg";
import iconClassPeriods from "../assets/icons/bottom-navigation/classPeriods.svg";
import iconUsers from "../assets/icons/bottom-navigation/users.svg";
import iconProfile from "../assets/icons/bottom-navigation/profile.svg";

const AdminItemsBottomNavigation = [
  {
    icon: iconHome,
    label: "Home",
    slug: "/admin/home",
  },
  {
    icon: iconCourses,
    label: "Courses",
    slug: "/admin/courses",
  },
  {
    icon: iconClassPeriods,
    label: "Class List",
    slug: "/admin/class-periods",
  },
  {
    icon: iconUsers,
    label: "User List",
    slug: "/admin/users",
  },
  {
    icon: iconProfile,
    label: "Profile",
    slug: "/admin/profile",
  },
];

export default AdminItemsBottomNavigation;
