import ProfileHeaderUser from "@/components/users/ProfileHeaderUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useStateContext } from "@/contexts/ContextProvider";
import axiosClient from "@/services/axiosClient";
import { AlertCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserDto } from "@/components/users/users";
import { Errors } from "@/components/global/ErrorDisplay";
import authService from "@/services/apis/auth/authService";

export default function ProfilePage() {
  const { currentUser, token } = useStateContext() as {
    currentUser: UserDto;
    token: string;
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useStateContext() as {
    setCurrentUser: (user: UserDto | null) => void;
    setToken: (token: string | null) => void;
  };

  // async function logout() {
  //   setLoading(true);
  //   try {
  //     const response = await axiosClient.post("/auth/logout");
  //     if (response.status === 204) {
  //       setCurrentUser(null);
  //       setToken(null);
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       const message = `${error.response.data.message}. Please refresh the page.`;
  //       // setErrorMessage(message);
  //       toast.error(message);
  //       setToken(null);
  //     } else {
  //       // setErrorMessage("Something went wrong, please try again later");
  //       const message = "Something went wrong, please try again later";
  //       toast.error(message);
  //     }
  //     setLoading(false);
  //   }
  // }

  const logout = async () => {
    setLoading(true);
    const response = await authService.logout();
    setLoading(false);

    if (response.success) {
      setCurrentUser(null);
      setToken(null);
      toast.success(response.message);

      navigate("/login");
    } else {
      setErrors(response.errors);
      toast.error(response.message);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <>
      <div className="m-4">
        <div className="flex justify-center">
          <ProfileHeaderUser user={currentUser} />
          <div className="flex items-center">
            <form method="post" onSubmit={handleLogout}>
              <div className="">
                {loading ? (
                  <ButtonLoading variant="secondary" />
                ) : (
                  <ButtonWithIcon variant="secondary" size="sm" type="submit">
                    <LogOut className="m-1" />
                    <Label className="font-sans font-bold text-sm mr-2">
                      Logout
                    </Label>
                  </ButtonWithIcon>
                )}
              </div>
            </form>
          </div>
        </div>
        <Separator className="my-3" />
      </div>
    </>
  );
}
