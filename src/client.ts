import { createTRPCReact } from "@trpc/react-query";
// import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../backend/index";

export const trpc = createTRPCReact<AppRouter>();
