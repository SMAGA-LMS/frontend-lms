import ItemMenuWithLabel from "../global/ItemMenuWithLabel";
import IconMenuWithBackground from "../global/IconMenuWithBackground";
import IconMenu from "../global/IconMenu";
import iconClassEnrollments from "@/assets/icons/class-enrollments.svg";
import { useNavigate } from "react-router-dom";

export default function HomeAdminMenu() {
  const navigate = useNavigate();

  const navigateToClassEnrollments = () => {
    navigate("/class-enrollments");
  };
  return (
    <div className="mt-5 flex justify-center w-full">
      <button onClick={navigateToClassEnrollments}>
        <ItemMenuWithLabel label="Class Enrollments">
          <IconMenuWithBackground color="smagaLMS-gray">
            <IconMenu icon={iconClassEnrollments} />
          </IconMenuWithBackground>
        </ItemMenuWithLabel>
      </button>
    </div>
  );
}
