import ItemMenuWithLabel from "@/components/ui/ItemMenuWithLabel";
import IconMenuWithBackground from "@/components/ui/IconMenuWithBackground";
import IconMenu from "@/components/ui/IconMenu";

import iconEnrolledCourses from "../../../assets/icons/enrolled-courses.svg";
import ProfileHeaderUser from "@/components/ProfileHeaderUser";
import { useEffect, useState } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import axiosClient from "@/services/axios-client";
import ThumbnailWithFooter from "@/components/ui/ThumbnailWithFooter";
import thumbnailStudents from "@/assets/images/thumbnail-students.svg";
import { Separator } from "@/components/ui/separator";

export default function HomeScreen() {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser, token } = useStateContext();

  // useEffect(() => {
  //   async function getCurrentUser() {
  //     setLoading(true);
  //     try {
  //       // const response = await axiosClient.get("/auth/me");
  //       // if (response.status === 200) {
  //       //   setCurrentUser(response.data.data);
  //       // }
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         setCurrentUser(null);
  //       } else {
  //         setErrors(["Something went wrong, please try again later"]);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getCurrentUser();
  // }, [setCurrentUser, token]);

  return (
    <>
      <div className="mx-4 mt-4">
        <ProfileHeaderUser user={currentUser} />
      </div>
      <div className="mt-5 pb-5">
        <div className="bg-smagaLMS-gradient-linear">
          <h1 className="text-smagaLMS-green font-sans font-bold text-center text-xl">
            Good Morning,
            <br />
            {currentUser?.fullname || currentUser.role}!
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
          <ItemMenuWithLabel label="Enrolled Courses">
            <IconMenuWithBackground color="smagaLMS-gray">
              <IconMenu icon={iconEnrolledCourses} />
            </IconMenuWithBackground>
          </ItemMenuWithLabel>
        </div>
      </div>
    </>
  );
}
