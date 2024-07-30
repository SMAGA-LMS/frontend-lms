import { useStateContext } from "@/contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/admin/home" />;
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
