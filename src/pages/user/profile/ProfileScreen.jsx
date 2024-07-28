import ProfileHeaderUser from "@/components/ProfileHeaderUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ButtonLoading } from "@/components/ui/ButtonLoading";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useStateContext } from "@/contexts/ContextProvider";
import axiosClient from "@/services/axios-client";
import { AlertCircle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProfileScreen() {
  const { currentUser, token } = useStateContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useStateContext();

  // const { toast } = useToast();

  async function logout() {
    setLoading(true);
    try {
      const response = await axiosClient.post("/auth/logout");
      if (response.status === 204) {
        setCurrentUser({});
        setToken(null);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const message = `${error.response.data.message}. Please refresh the page.`;
        // setErrorMessage(message);
        toast.error(message);
      } else {
        // setErrorMessage("Something went wrong, please try again later");
        const message = "Something went wrong, please try again later";
        toast.error(message);
      }
      setLoading(false);
    }
  }

  useEffect(() => {}, [errorMessage]);

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

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

        {/* {errorMessage && (
          <div className="">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </div>
        )} */}
      </div>
    </>
  );
}
