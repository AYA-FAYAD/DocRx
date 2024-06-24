import { router } from "../trpc";
import { doctorsRouter } from "./doctors";
import { userRouter } from "./users";
import { authRouter } from "./auth";
import { patientsRouter } from "./patients";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  patient: patientsRouter,
  doctor: doctorsRouter,
});

export type AppRouter = typeof appRouter;
