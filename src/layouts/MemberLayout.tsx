import { useStateContext } from "@/contexts/ContextProvider";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UserRolesEnum from "@/enums/UserRoleEnum";
import AdminBottomNavLayout from "./admin/AdminBottomNavLayout";
import WithToaster from "@/components/global/WithToaster";
import TeacherBottomNavLayout from "./teacher/TeacherBottomNavLayout";
import StudentBottomNavLayout from "./student/StudentBottomNavLayout";
import authService from "@/services/apis/auth/authService";
import Lottie from "lottie-react";
import waveLoadingAnimation from "@/assets/lotties/wave-loading-animation.json";
import bottomNavPaths from "./bottomNavPaths";

export default function MemberLayout() {
  const { currentUser, setCurrentUser, token, setToken } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const hasFetchedUser = useRef(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCurrentUser = async () => {
      setLoading(true);
      const response = await authService.me();
      setLoading(false);

      if (response.success && response.data) {
        setCurrentUser(response.data.user);
      } else {
        // set timeout to allow toast to show
        setTimeout(() => {
          toast.error(response.message);
          setCurrentUser(null);
          setToken(null);
          navigate("/login");
        }, 1500);
      }
    };

    if (!hasFetchedUser.current) {
      fetchCurrentUser();
      hasFetchedUser.current = true;
    }
  }, [navigate, setCurrentUser, setToken, token]);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen w-full">
          <Lottie
            animationData={waveLoadingAnimation}
            loop={true}
            className="w-24 h-24"
          />
        </div>
      </>
    );
  }

  const shouldRenderBottomNav = bottomNavPaths.some(
    (path) => location.pathname === path
  );

  console.log("shouldRenderBottomNav", shouldRenderBottomNav);

  return (
    <>
      <WithToaster>
        {currentUser && (
          <div>
            <Outlet />
          </div>
        )}
        {shouldRenderBottomNav && currentUser?.role === UserRolesEnum.ADMIN && (
          <AdminBottomNavLayout />
        )}
        {shouldRenderBottomNav &&
          currentUser?.role === UserRolesEnum.TEACHER && (
            <TeacherBottomNavLayout />
          )}
        {shouldRenderBottomNav &&
          currentUser?.role === UserRolesEnum.STUDENT && (
            <StudentBottomNavLayout />
          )}
      </WithToaster>
    </>
  );
}
