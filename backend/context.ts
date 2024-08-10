import * as trpcExpress from "@trpc/server/adapters/express";
import { verifyToken } from "@clerk/clerk-sdk-node";
import { Request, Response } from "express";

export const createContext = async ({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) => {
  const authHeader = req.headers.authorization;
  let clerkUserId = null;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const session = await verifyToken(token);
      clerkUserId = session.userId;
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  return {
    req,
    res,
    clerkUserId,
  };
};

export type Context = ReturnType<typeof createContext>;
