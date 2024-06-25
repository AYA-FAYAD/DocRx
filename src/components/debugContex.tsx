import { trpc } from "../client";

const DebugContext = () => {
  const { data, error, isLoading } = trpc.user.getContext.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>User ID: {data?.userId}</p>
      <p>User Role: {data?.userRole}</p>
    </div>
  );
};

export default DebugContext;
