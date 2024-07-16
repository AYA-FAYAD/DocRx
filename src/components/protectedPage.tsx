import useUserRole from "../hooks/useUserRole";

const ProtectedPage = ({ children, allowedRole }) => {
  const { role, isLoading, error } = useUserRole();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div> Error:{error.message}</div>;
  }

  if (role !== allowedRole) {
    return <div> go way you are not doctor</div>;
  }

  return <>{children}</>;
};

export default ProtectedPage;
