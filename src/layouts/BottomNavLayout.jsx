import { Outlet } from "react-router-dom";
import BottomNavigationMenu from "@/components/BottomNavigationMenu";

export default function BottomNavLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <BottomNavigationMenu />
    </>
  );
}
