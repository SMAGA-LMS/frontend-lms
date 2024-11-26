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
    active: true,
  },
  {
    icon: iconClassEnrollment,
    label: "Class",
    slug: "/class-enrollments",
    active: true,
  },
  {
    icon: iconAttendances,
    label: "Presence",
    slug: "/attendances",
    active: false,
  },
  {
    icon: iconAssignments,
    label: "Assignments",
    slug: "/assignments",
    active: false,
  },
  {
    icon: iconProfile,
    label: "Profile",
    slug: "/profile",
    active: true,
  },
];

export default StudentItemsBottomNavigation;
