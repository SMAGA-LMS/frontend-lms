import BottomNavigationMenu from "@/components/BottomNavigationMenu";
import StudentItemsBottomNavigation from "@/data/StudentItemsBottomNavigation";

export default function StudentBottomNavLayout() {
  return (
    <>
      <BottomNavigationMenu
        itemsBottomNavigation={StudentItemsBottomNavigation}
      />
    </>
  );
}
