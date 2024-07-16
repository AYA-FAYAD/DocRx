import { router, protectedProcedure } from "../trpc";

export const testRouter = router({
  protectedTest: protectedProcedure.query(async ({ ctx }) => {
    return {
      message: "You are authenticated",
      userId: ctx.userId,
      userRole: ctx.userRole,
    };
  }),
});
