import { useState, useEffect } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";

const useUserRole = () => {
  const { user } = useUser();
  const [clerkUserId, setClerkUserId] = useState("");
  useEffect(() => {
    if (user) {
      setClerkUserId(user.id);
    }
  }, [user]);
  const { data, error, isLoading } = trpc.user.getUserRole.useQuery(
    { clerkUserId },
    { enabled: !!clerkUserId }
  );

  return { role: data?.role, isLoading, error };
};

export default useUserRole;
