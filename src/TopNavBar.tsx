import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

import { getCurrDate } from "./dateTimeService";

const listDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric" });

function TopNavBar() {
  const today: Date = getCurrDate();

  return (
    <div id="top_nav_bar" className="flex w-full justify-between">
      <NavigationMenu id="views_list">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/Dashboard" className="link-item">
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/Calendar" className="link-item">
              Calendar View
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/List" className="link-item">
              List View
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/Chart" className="link-item">
              Chart View
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/Services" className="link-item">
              Manage Services
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <p className="p-2 text-sm">
        {listDateTimeFormat.format(today)}
      </p>
    </div>
  );
}

export default TopNavBar;
