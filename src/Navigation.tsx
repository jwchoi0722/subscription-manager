import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

import "./Navigation.css";

function Navigation() {
  return (
    <NavigationMenu id="views_list" className="link-list">
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
  );
}

export default Navigation;
