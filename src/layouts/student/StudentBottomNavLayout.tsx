import BottomNavigationMenu from "@/components/BottomNavigationMenu";
import StudentItemsBottomNavigation from "@/data/StudentItemsBottomNavigation";
import { Outlet } from "react-router-dom";

export default function StudentBottomNavLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <BottomNavigationMenu
        itemsBottomNavigation={StudentItemsBottomNavigation}
      />
    </>
  );
}
