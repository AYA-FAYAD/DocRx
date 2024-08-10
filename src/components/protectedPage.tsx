import useUserRole from "../hooks/useUserRole";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children, allowedRole }: any) => {
  const { role, isLoading, error } = useUserRole();

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
