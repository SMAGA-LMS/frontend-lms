import { toast } from "sonner";
import ItemMenuWithLabel from "../global/ItemMenuWithLabel";
import IconMenuWithBackground from "../global/IconMenuWithBackground";
import IconMenu from "../global/IconMenu";
import iconEnrolledCourses from "@/assets/icons/enrolled-courses.svg";

export default function HomeAdminMenu() {
  return (
    <div className="mt-5 flex justify-center w-full">
      <button
        onClick={() => {
          toast.info("Fitur ini belum tersedia");
        }}
      >
        <ItemMenuWithLabel label="Enrolled Courses">
          <IconMenuWithBackground color="smagaLMS-gray">
            <IconMenu icon={iconEnrolledCourses} />
          </IconMenuWithBackground>
        </ItemMenuWithLabel>
      </button>
    </div>
  );
}
