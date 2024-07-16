import ItemMenuWithLabel from "@/components/ui/ItemMenuWithLabel";
import IconMenuWithBackground from "@/components/ui/IconMenuWithBackground";
import IconMenu from "@/components/ui/IconMenu";

import iconEnrolledCourses from "../../../assets/icons/enrolled-courses.svg";

export default function HomeScreen() {
  return (
    <>
      <ItemMenuWithLabel label="Enrolled Courses">
        <IconMenuWithBackground color="smagaLMS-gray">
          <IconMenu icon={iconEnrolledCourses} />
        </IconMenuWithBackground>
      </ItemMenuWithLabel>
    </>
  );
}
