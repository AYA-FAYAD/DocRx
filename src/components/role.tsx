import React, { useState } from "react";
import { trpc } from "../client";

export const RolePage: React.FC = () => {
  const [role, setRole] = useState("");
  const mutation = trpc.user.updateUserRole.useMutation();

  const handleUpdateRole = async () => {
    try {
      await mutation.mutateAsync({ role });
      alert("Role updated successfully");
    } catch (error) {
      console.error("Failed to update role", error);
    }
  };

  return (
    <div>
      <h1>Update Role</h1>
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Enter new role"
      />
      <button onClick={handleUpdateRole}>Update Role</button>
    </div>
  );
};
