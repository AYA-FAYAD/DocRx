import { useState, useEffect } from "react";
import { useGetUserQuery } from "../stors";
import { trpc } from "../client";
import { SignIn } from "@clerk/clerk-react";
function LogIn() {
  const [userName, setUserName] = useState("");
  const { data: users, error, isLoading, refetch } = trpc.getUser.useQuery();
  const [searchUserName, setSearchUserName] = useState("");
  const { data: foundUser, refetch: fetchUserByName } =
    trpc.getUserByname.useQuery(
      { userName: searchUserName },
      { enabled: false }
    );

  const handelClick = async (e) => {
    setSearchUserName(userName); // Set the username to search for
    fetchUserByName();
  };
  useEffect(() => {
    if (foundUser) {
      console.log("Found user:", foundUser);
    }
  }, [foundUser]);

  return (
    <div>
      <h1>Log In</h1>
      {/* <SignIn /> */}
      <h1>Users List</h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handelClick}>sherch </button>
      {isLoading && <p>Loading users...</p>}
      {error && <p>Error fetching users: {error.message}</p>}
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Username: {user.userName}, Password: {user.password}
            </li>
          ))}
        </ul>
      )}
      <button onClick={refetch}>Refetch Users</button>
    </div>
  );
}

export default LogIn;
