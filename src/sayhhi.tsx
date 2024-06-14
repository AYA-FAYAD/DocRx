import React from "react";
import { trpc } from "./client";

const SayHi = () => {
  const addUser = async () => {
    const adduser = await trpc.createUser.mutate({
      input: {
        userName: "aya",
        password: "aya133",
      },
    });
    console.log(adduser);
    return adduser;
  };

  return <div>user add</div>;
};

export default SayHi;
