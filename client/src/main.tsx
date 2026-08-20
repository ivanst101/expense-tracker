import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from "./pages/Dashboard.tsx";
import Expenses from "./pages/Expenses.tsx";
import ExpensesID from "./components/ExpensesID.tsx";
import NotFound from "./components/NotFound.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Signup from "./pages/Signup.tsx";
import { Toaster } from "sonner";
import Login from "./pages/Login.jsx";

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
    path: "signup",
    Component: Signup,
  },
  {
    path: "login",
    Component: Login,
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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
