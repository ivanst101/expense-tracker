import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <nav>
      <NavLink to="expenses">Expenses</NavLink>
      <NavLink to="dashboard">Dashboard</NavLink>
    </nav>
  );
}
