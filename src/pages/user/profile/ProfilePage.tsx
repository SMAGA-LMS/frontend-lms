import ProfileHeaderUser from "@/components/users/ProfileHeaderUser";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useStateContext } from "@/contexts/ContextProvider";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import authService from "@/services/apis/auth/authService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/global/ButtonLoading";

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
      }, 600);
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {loading ? (
                  <ButtonLoading />
                ) : (
                  <Button variant="secondary" size="sm">
                    <LogOut className="m-1" />
                    <Label className="font-sans font-bold text-sm mr-2">
                      Logout
                    </Label>
                  </Button>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will log you out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    {loading ? <ButtonLoading /> : "Logout"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <Separator className="my-3" />
      </div>
    </>
  );
}
