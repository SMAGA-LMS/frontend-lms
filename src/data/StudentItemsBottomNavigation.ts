import iconHome from "../assets/icons/bottom-navigation/home.svg";
import iconAttendances from "../assets/icons/bottom-navigation/attendances.svg";
import iconAssignments from "../assets/icons/bottom-navigation/assignments.svg";
import iconProfile from "../assets/icons/bottom-navigation/profile.svg";
import iconClassEnrollment from "@/assets/icons/bottom-navigation/class-enrollments.svg";

const StudentItemsBottomNavigation = [
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
    icon: iconAttendances,
    label: "",
    slug: "/attendances",
  },
  {
    icon: iconAssignments,
    label: "Assignments",
    slug: "/assignments",
  },
  {
    icon: iconProfile,
    label: "Profile",
    slug: "/profile",
  },
];

export default StudentItemsBottomNavigation;
