import { useStateContext } from "@/contexts/ContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UserRolesEnum from "@/enums/UserRoleEnum";
import AdminBottomNavLayout from "./admin/AdminBottomNavLayout";
import WithToaster from "@/components/global/WithToaster";
import TeacherBottomNavLayout from "./teacher/TeacherBottomNavLayout";
import StudentBottomNavLayout from "./student/StudentBottomNavLayout";
import authService from "@/services/apis/auth/authService";

export default function MemberLayout() {
  const { setCurrentUser, token, currentUser } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCurrentUser = async () => {
      const response = await authService.me();

      if (response.success && response.data) {
        setCurrentUser(response.data.user);
      } else {
        if (response.message) {
          toast.error(response.message);
        }
        setCurrentUser(null);
        localStorage.removeItem("ACCESS_TOKEN");
      }
    };

    fetchCurrentUser();
  }, [navigate, setCurrentUser, token]);

  return (
    <>
      <WithToaster>
        {currentUser?.role === UserRolesEnum.ADMIN && <AdminBottomNavLayout />}
        {currentUser?.role === UserRolesEnum.TEACHER && (
          <TeacherBottomNavLayout />
        )}
        {currentUser?.role === UserRolesEnum.STUDENT && (
          <StudentBottomNavLayout />
        )}
      </WithToaster>
    </>
  );
}
