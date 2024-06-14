// import { userRouter } from "./users";
import { router, publicProcedure } from "../trpc";

export const appRouter = router({
  sayHi: publicProcedure.query(() => {
    return "Hi from the backend aya here!";
  }),
  // sayHi: t.procedure.query(() => {
  //   return "hi from backend aya try to conect trpc";
  // }),
  // log: t.procedure
  //   .input((v) => {
  //     if (typeof v === "string") return v;
  //     throw new Error("invaild input:Expected string");
  //   })
  //   .mutation((req) => {
  //     console.log(`clinet says:${req.input}`);
  //     return true;
  //   }),
  // users: userRouter,
});
export type AppRouter = typeof appRouter;

// export const mergeRouters = t.mergeRouters(appRouter, userRouter);
