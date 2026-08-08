import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <Sidebar />
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
