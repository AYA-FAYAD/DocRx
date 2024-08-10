import { useState, useEffect } from "react";
import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
const ProtectedPage = ({ children, allowedRole }: any) => {
  const { role, isLoading, error } = useUserRole();
  const { user, isSignedIn } = useUser();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (role) {
      setUserRole(role);
    }
  }, [role]);

  console.log("Role:", role);
  console.log("Allowed Role:", allowedRole);
  console.log("Is Signed In:", isSignedIn);

  if (!isSignedIn && !isLoading) {
    return <Navigate to="/signup" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> Error:{error.message}</div>;
  }

  if (role === "defaultRole") {
    return <Navigate to="/selectrole" />;
  }
  if (!allowedRole.includes(role)) {
    return <Navigate to="/Allprescription" />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
