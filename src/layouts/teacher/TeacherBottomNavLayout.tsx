import BottomNavigationMenu from "@/components/BottomNavigationMenu";
import TeacherItemsBottomNavigation from "@/data/TeacherItemsBottomNavigation";

export default function TeacherBottomNavLayout() {
  return (
    <>
      <BottomNavigationMenu
        itemsBottomNavigation={TeacherItemsBottomNavigation}
      />
    </>
  );
}
