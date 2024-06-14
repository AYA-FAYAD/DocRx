import { useState } from "react";
import { trpc } from "../client";
function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const createUser = trpc.createUser.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser.mutateAsync({ userName, password });
      console.log("New user created");
      setUserName("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          className="border"
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border"
        />
        <button className="bg-blue-600 border rounded">signUp</button>
      </form>
    </div>
  );
}

export default SignUp;
