import { LayoutGrid, BanknoteArrowDown, LogOut } from "lucide-react";
import { NavLink } from "react-router";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: BanknoteArrowDown,
  },
];

export default function Sidebar() {
  return (
    <ShadcnSidebar
      variant="floating"
      collapsible="icon"
      className="text-sidebar-text"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <NavLink to="/dashboard" className="flex gap-2 items-center">
                <img
                  src="/logo.png"
                  alt="FinFlow"
                  className="size-8 shrink-0"
                />
                <span className="text-lg font-semibold text-heading-one">
                  FinFlow
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <NavLink to={item.url} className="flex gap-2 items-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Log Out">
              <NavLink to="/dashboard" className="flex gap-2 items-center">
                <LogOut />
                Log out
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </ShadcnSidebar>
  );
}
