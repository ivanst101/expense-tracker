import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
