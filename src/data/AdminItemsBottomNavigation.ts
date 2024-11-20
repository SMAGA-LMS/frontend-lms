import iconHome from "../assets/icons/bottom-navigation/home.svg";
import iconClassrooms from "../assets/icons/bottom-navigation/classrooms.svg";
import iconUsers from "../assets/icons/bottom-navigation/users.svg";
import iconProfile from "../assets/icons/bottom-navigation/profile.svg";
import iconClassEnrollment from "@/assets/icons/bottom-navigation/class-enrollments.svg";

const AdminItemsBottomNavigation = [
  {
    icon: iconHome,
    label: "Home",
    slug: "/home",
  },
  {
    icon: iconClassEnrollment,
    label: "Class",
    slug: "/class-enrollments",
  },
  {
    icon: iconClassrooms,
    label: "Classroom",
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
