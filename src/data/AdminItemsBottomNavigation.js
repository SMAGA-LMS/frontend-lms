import iconHome from "../assets/icons/bottom-navigation/home.svg";
import iconCourses from "../assets/icons/bottom-navigation/courses.svg";
import iconClasses from "../assets/icons/bottom-navigation/classes.svg";
import iconUserList from "../assets/icons/bottom-navigation/user-list.svg";
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
    icon: iconClasses,
    label: "Classes",
    slug: "/admin/classes",
  },
  {
    icon: iconUserList,
    label: "User List",
    slug: "/admin/user-list",
  },
  {
    icon: iconProfile,
    label: "Profile",
    slug: "/admin/profile",
  },
];

export default AdminItemsBottomNavigation;
