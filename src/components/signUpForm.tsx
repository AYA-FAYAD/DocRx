import { useState } from "react";
import { trpc } from "../client";
import { SignUpButton } from "@clerk/clerk-react";

function SignupForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const createUser = trpc.user.createUser.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser.mutateAsync({
        name,
        password,
        email,
        role,
      });
      console.log("New user created");
      setName("");
      setPassword("");
      setEmail("");
      setRole("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          className="border"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border"
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
