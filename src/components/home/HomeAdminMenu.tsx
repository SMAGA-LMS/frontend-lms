import ItemMenuWithLabel from "../global/ItemMenuWithLabel";
import IconMenuWithBackground from "../global/IconMenuWithBackground";
import { useNavigate } from "react-router-dom";
import { BookOpenTextIcon } from "lucide-react";

export default function HomeAdminMenu() {
  const navigate = useNavigate();

  const navigateToCourses = () => {
    navigate("/courses");
  };
  return (
    <div className="mt-5 flex justify-center w-full">
      <button onClick={navigateToCourses}>
        <ItemMenuWithLabel label="PIC Course">
          <IconMenuWithBackground color="smagaLMS-gray">
            <BookOpenTextIcon size={24} color="white" />
          </IconMenuWithBackground>
        </ItemMenuWithLabel>
      </button>
    </div>
  );
}
