import ProfileHeaderUser from "@/components/users/ProfileHeaderUser";
import { ButtonLoading } from "@/components/global/ButtonLoading";
import ButtonWithIcon from "@/components/global/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useStateContext } from "@/contexts/ContextProvider";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "@/services/apis/auth/authService";

export default function ProfilePage() {
  const { currentUser } = useStateContext();
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useStateContext();

  if (!currentUser) {
    setToken(null);
    navigate("/login");
    return;
  }

  const logout = async () => {
    setLoading(true);
    const response = await authService.logout();
    setLoading(false);

    console.log("response: ", response);

    if (response.success) {
      // set timeout to allow toast to show
      toast.success(response.message);
      setTimeout(() => {
        setCurrentUser(null);
        setToken(null);
        navigate("/login");
      }, 200);
    } else {
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
