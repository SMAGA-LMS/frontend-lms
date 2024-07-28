import { useStateContext } from "@/contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function MemberLayout() {
  const { currentUser, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
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
