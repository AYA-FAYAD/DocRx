import "dotenv/config";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const clerkMiddleware = ClerkExpressWithAuth({
  clientId: process.env.CLERK_PUBLISHABLE_KEY,
});

export { clerkMiddleware };
