import BottomNavigationMenu from "@/components/BottomNavigationMenu";
import TeacherItemsBottomNavigation from "@/data/TeacherItemsBottomNavigation";
import { Outlet } from "react-router-dom";

export default function TeacherBottomNavLayout() {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <BottomNavigationMenu
        itemsBottomNavigation={TeacherItemsBottomNavigation}
      />
    </>
  );
}
