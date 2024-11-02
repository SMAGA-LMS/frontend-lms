import BottomNavigationMenu from "@/components/BottomNavigationMenu";
import AdminItemsBottomNavigation from "@/data/AdminItemsBottomNavigation";

export default function AdminBottomNavLayout() {
  return (
    <>
      <BottomNavigationMenu
        itemsBottomNavigation={AdminItemsBottomNavigation}
      />
    </>
  );
}
