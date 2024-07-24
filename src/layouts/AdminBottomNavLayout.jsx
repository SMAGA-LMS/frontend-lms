import { Navigate, Outlet } from "react-router-dom";
import BottomNavigationMenu from "@/components/BottomNavigationMenu";
import { useStateContext } from "@/contexts/ContextProvider";

export default function AdminBottomNavLayout() {
  const { currentUser, token } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div>
        <Outlet />
      </div>
      <BottomNavigationMenu />
    </>
  );
}
