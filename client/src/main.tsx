import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "./pages/Dashboard.tsx";
import Expenses from "./pages/Expenses.tsx";
import ExpensesID from "./components/ExpensesID.tsx";
import NotFound from "./components/NotFound.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "expenses",
        Component: Expenses,
      },
    ],
  },
  {
    path: "expenses/:id",
    Component: ExpensesID,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
