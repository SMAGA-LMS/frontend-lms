import iconHome from "../assets/icons/bottom-navigation/home.svg";
import iconCourses from "../assets/icons/bottom-navigation/courses.svg";
import iconAttendances from "../assets/icons/bottom-navigation/attendances.svg";
import iconAssignments from "../assets/icons/bottom-navigation/assignments.svg";
import iconProfile from "../assets/icons/bottom-navigation/profile.svg";

const StudentItemsBottomNavigation = [
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
