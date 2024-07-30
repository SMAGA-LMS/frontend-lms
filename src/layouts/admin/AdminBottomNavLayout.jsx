import BottomNavigationMenu from "@/components/BottomNavigationMenu";
import AdminItemsBottomNavigation from "@/data/AdminItemsBottomNavigation";
import { Outlet } from "react-router-dom";

export default function AdminBottomNavLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <BottomNavigationMenu
        itemsBottomNavigation={AdminItemsBottomNavigation}
      />
    </>
  );
}
