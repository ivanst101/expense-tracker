import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Sidebar from "../components/layouts/Sidebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <Sidebar />

      <main className="flex-1">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
