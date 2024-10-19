import { useStateContext } from "@/contexts/ContextProvider";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleBasedRoute({
  allowedRoles,
  children,
}: RoleBasedRouteProps) {
  const { currentUser } = useStateContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    toast.warning("You are not authorized to access this page");
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
