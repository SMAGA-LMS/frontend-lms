import ItemMenuWithLabel from "@/components/ui/ItemMenuWithLabel";
import IconMenuWithBackground from "@/components/ui/IconMenuWithBackground";
import IconMenu from "@/components/ui/IconMenu";

import iconEnrolledCourses from "../../../assets/icons/enrolled-courses.svg";
import ProfileHeaderUser from "@/components/ProfileHeaderUser";
import { useStateContext } from "@/contexts/ContextProvider";
import ThumbnailWithFooter from "@/components/ui/ThumbnailWithFooter";
import thumbnailStudents from "@/assets/images/thumbnail-students.svg";
import { toast } from "sonner";

export default function HomeScreen() {
  const { currentUser } = useStateContext();

  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  }

  return (
    <>
      <div className="mx-4 mt-4">
        <ProfileHeaderUser user={currentUser} />
      </div>
      <div className="mt-5 pb-5">
        <div className="bg-smagaLMS-gradient-linear">
          <h1 className="text-smagaLMS-green font-sans font-bold text-center text-xl">
            {getGreeting()}
            <br />
            {currentUser?.full_name || currentUser.role.name}!
          </h1>
          <ThumbnailWithFooter
            image={thumbnailStudents}
            footerText="How are you?"
            sizeText="text-sm"
          />
        </div>
      </div>
      <div className="mx-4">
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
      </div>
    </>
  );
}
