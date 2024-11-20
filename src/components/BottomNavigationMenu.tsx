import { toast } from "sonner";
import IconMenu from "./global/IconMenu";
import ItemMenuWithLabel from "./global/ItemMenuWithLabel";

import { NavLink } from "react-router-dom";

interface BottomNavigationItem {
  slug: string;
  label: string;
  icon: any;
  active?: boolean;
}

interface BottomNavigationMenuProps {
  itemsBottomNavigation: BottomNavigationItem[];
}

export default function BottomNavigationMenu({
  itemsBottomNavigation,
}: BottomNavigationMenuProps) {
  return (
    <>
      <div className="flex justify-center max-w-sm">
        <div className="fixed inset-x-0 bottom-0 flex flex-row justify-center w-full py-2 bg-white shadow-2xl border-t border-gray-200">
          {itemsBottomNavigation.map((item) => (
            <div key={item.slug}>
              {item.active ? (
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : "inactive"
                  }
                  to={item.slug}
                >
                  <ItemMenuWithLabel label={item.label}>
                    <IconMenu icon={item.icon} />
                  </ItemMenuWithLabel>
                </NavLink>
              ) : (
                <div
                  key={item.slug}
                  onClick={() => toast.info("Under development")}
                  className="inactive cursor-pointer"
                >
                  <ItemMenuWithLabel label={item.label}>
                    <IconMenu icon={item.icon} />
                  </ItemMenuWithLabel>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
