import { useStateContext } from "@/contexts/ContextProvider";
import UserRolesEnum from "@/enums/UserRoleEnum";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

const withRoleBasedRoute = (
  element: JSX.Element,
  allowedRoles: UserRolesEnum[]
) => <RoleBasedRoute allowedRoles={allowedRoles}>{element}</RoleBasedRoute>;

function RoleBasedRoute({ allowedRoles, children }: RoleBasedRouteProps) {
  const { currentUser } = useStateContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    setTimeout(() => {
      toast.warning("You are not authorized to access this page");
    }, 300);
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export { withRoleBasedRoute };
