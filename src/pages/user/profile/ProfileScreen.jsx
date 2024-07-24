import { ButtonLoading } from "@/components/ui/ButtonLoading";
import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import { Label } from "@/components/ui/label";
import { useStateContext } from "@/contexts/ContextProvider";
import axiosClient from "@/services/axios-client";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const { currentUser, token } = useStateContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useStateContext();

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
        const errorMessage = `${error.response.data.message}. Please refresh the page.`;
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage("Something went wrong, please try again later");
      }
      setLoading(false);
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }
  return (
    <>
      <div>Profile Page</div>
      <div>{currentUser.name}</div>
      {errorMessage && (
        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
      )}
      <form method="post" onSubmit={handleLogout}>
        <div className="mx-24">
          {loading ? (
            <ButtonLoading variant="secondary" />
          ) : (
            <ButtonWithIcon variant="secondary" type="submit">
              <LogOut className="mr-4" />
              <Label className="font-sans font-bold text-base mr-4">
                Logout
              </Label>
            </ButtonWithIcon>
          )}
        </div>
      </form>
    </>
  );
}
