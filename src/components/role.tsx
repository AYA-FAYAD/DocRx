import React, { useState } from "react";
import { trpc } from "../client";

function SetRole() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const mutation = trpc.user.upduterole.useMutation();

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({
        email,
        newRole: role,
      });
      console.log("Role updated successfully");
      setEmail("");
      setRole("");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <form onSubmit={handleUpdateRole}>
      <h1>Update Role</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        required
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Enter new role"
        required
      />
      <button type="submit">Update Role</button>
    </form>
  );
}

export default SetRole;
