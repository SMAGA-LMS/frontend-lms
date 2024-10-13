import ProfileHeaderUser from "@/components/users/ProfileHeaderUser";
import { useStateContext } from "@/contexts/ContextProvider";
import ThumbnailWithFooter from "@/components/global/ThumbnailWithFooter";
import thumbnailStudents from "@/assets/images/thumbnail-students.svg";
import UserRolesEnum from "@/enums/UserRoleEnum";
import { useEffect, useState } from "react";
import HomeAdminMenu from "@/components/home/HomeAdminMenu";
import HomeStudentMenu from "@/components/home/HomeStudentMenu";
import HomeTeacherMenu from "@/components/home/HomeTeacherMenu";
import { UserDto } from "@/components/users/users";

export default function HomePage() {
  const { currentUser } = useStateContext() as { currentUser: UserDto };
  const [footerText, setFooterText] = useState<string>("");

  function getGreeting(): string {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  }

  useEffect(() => {
    switch (currentUser.role) {
      case UserRolesEnum.STUDENT:
        setFooterText("Don't forget to do your assignments!");
        break;
      case UserRolesEnum.TEACHER:
        setFooterText("Don't forget to take student attendance during class!");
        break;
      default:
        setFooterText("How are you?");
        break;
    }
  }, [currentUser.role]);

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
            {currentUser?.name || currentUser.role}!
          </h1>
          <ThumbnailWithFooter
            image={thumbnailStudents}
            footerText={footerText}
            sizeText="text-sm"
          />
        </div>
      </div>
      <div className="mx-4">
        {currentUser.role === UserRolesEnum.ADMIN && <HomeAdminMenu />}
        {currentUser.role === UserRolesEnum.STUDENT && <HomeStudentMenu />}
        {currentUser.role === UserRolesEnum.TEACHER && <HomeTeacherMenu />}
      </div>
    </>
  );
}
