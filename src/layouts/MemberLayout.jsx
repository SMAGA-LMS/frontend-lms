import { useStateContext } from "@/contexts/ContextProvider";
import axiosClient from "@/services/axiosClient";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import waveLoadingAnimation from "@/assets/lotties/wave-loading-animation.json";

export default function MemberLayout() {
  const { setCurrentUser, token } = useStateContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    console.log("MemberLayout mounted");

    async function fetchCurrentUser() {
      try {
        const response = await axiosClient.get("/auth/me");
        if (response.status === 200) {
          setCurrentUser(response.data.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setCurrentUser({});
          localStorage.removeItem("ACCESS_TOKEN");
        } else {
          toast.error("Something went wrong, please try again later");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();
  }, [token, navigate, setCurrentUser]);

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

  return (
    <>
      <div>
        <Outlet />
        <Toaster position="bottom-center" richColors closeButton />
      </div>
    </>
  );
}
