import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard.tsx";
import Expenses from "./pages/Expenses.tsx";
import ExpensesID from "./components/ExpensesID.tsx";
import NotFound from "./components/NotFound.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
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
