import iconHome from "../assets/icons/bottom-navigation/home.svg";
import iconCourses from "../assets/icons/bottom-navigation/courses.svg";
import iconClasses from "../assets/icons/bottom-navigation/classes.svg";
import iconUserList from "../assets/icons/bottom-navigation/user-list.svg";
import iconProfile from "../assets/icons/bottom-navigation/profile.svg";

const ItemsBottomNavigation = [
  {
    icon: iconHome,
    label: "Home",
    slug: "/user/home",
  },
  {
    icon: iconCourses,
    label: "Courses",
    slug: "/user/courses",
  },
  {
    icon: iconClasses,
    label: "Classes",
    slug: "/user/classes",
  },
  {
    icon: iconUserList,
    label: "User List",
    slug: "/user/user-list",
  },
  {
    icon: iconProfile,
    label: "Profile",
    slug: "/user/profile",
  },
];

export default ItemsBottomNavigation;
