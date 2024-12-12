import ItemMenuWithLabel from "../global/ItemMenuWithLabel";
import IconMenuWithBackground from "../global/IconMenuWithBackground";
import { useNavigate } from "react-router-dom";
import { BookOpenTextIcon } from "lucide-react";
import attendanceIcon from "@/assets/icons/attendances.svg";
import IconMenu from "../global/IconMenu";

export default function HomeAdminMenu() {
  const navigate = useNavigate();

  const navigateToCourses = () => {
    navigate("/courses");
  };

  const navigateToAttendances = () => {
    navigate("/attendances");
  };
  return (
    <div className="mt-5 flex justify-center w-full">
      <button onClick={navigateToAttendances}>
        <ItemMenuWithLabel label="Attendance">
          <IconMenuWithBackground color="smagaLMS-russian-green">
            <IconMenu icon={attendanceIcon} />
          </IconMenuWithBackground>
        </ItemMenuWithLabel>
      </button>
      <button onClick={navigateToCourses}>
        <ItemMenuWithLabel label="Course">
          <IconMenuWithBackground color="smagaLMS-gray">
            <BookOpenTextIcon size={24} color="white" />
          </IconMenuWithBackground>
        </ItemMenuWithLabel>
      </button>
    </div>
  );
}
