import IconMenu from "./ui/IconMenu";
import ItemMenuWithLabel from "./ui/ItemMenuWithLabel";
import ItemsBottomNavigation from "../data/ItemsBottomNavigation";
import { NavLink } from "react-router-dom";

export default function BottomNavigationMenu() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 flex flex-row w-full py-4 bg-white shadow-2xl border-t border-gray-200">
        {ItemsBottomNavigation.map((item) => (
          <NavLink
            className={({ isActive, isPending }) =>
              isActive ? "active" : isPending ? "pending" : "inactive"
            }
            key={item.slug}
            to={item.slug}
          >
            <ItemMenuWithLabel label={item.label}>
              <IconMenu icon={item.icon} />
            </ItemMenuWithLabel>
          </NavLink>
        ))}
      </div>
    </>
  );
}
