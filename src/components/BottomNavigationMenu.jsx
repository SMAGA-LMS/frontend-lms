import IconMenu from "./ui/IconMenu";
import ItemMenuWithLabel from "./ui/ItemMenuWithLabel";

import { NavLink } from "react-router-dom";

export default function BottomNavigationMenu({ itemsBottomNavigation }) {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 flex flex-row justify-center w-ful py-2 bg-white shadow-2xl border-t border-gray-200">
        {itemsBottomNavigation.map((item) => (
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
