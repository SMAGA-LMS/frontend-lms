import ItemMenuWithLabel from "../global/ItemMenuWithLabel";
import IconMenuWithBackground from "../global/IconMenuWithBackground";
import { BookOpenTextIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeTeacherMenu() {
  const navigate = useNavigate();
  const navigateToPICCourse = () => {
    navigate("/courses");
  };
  return (
    <div className="mt-5 flex items-end justify-end">
      {/* <div className="bg-slate-300 rounded-xl py-2 px-4 flex items-center">
        <div className="mr-2">
          <IconMenu icon={iconAssignments} />
        </div>
        <div>
          <p className="text-sm">Total: 0 tugas</p>
          <p className="text-sm">
            <b>perlu dinilai!</b>
          </p>
        </div>
      </div> */}
      <button onClick={navigateToPICCourse}>
        <ItemMenuWithLabel label="PIC Course">
          <IconMenuWithBackground color="smagaLMS-gray">
            <BookOpenTextIcon size={24} color="white" />
          </IconMenuWithBackground>
        </ItemMenuWithLabel>
      </button>
    </div>
  );
}
