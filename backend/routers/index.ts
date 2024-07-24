import { router } from "../trpc";
import { doctorsRouter } from "./doctors";
import { userRouter } from "./users";
import { authRouter } from "./auth";
import { patientsRouter } from "./patients";
import { testRouter } from "./test";
import { prescriptionsRouter } from "./prescriptions";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  patient: patientsRouter,
  doctor: doctorsRouter,
  test: testRouter,
  prescription: prescriptionsRouter,
});

export type AppRouter = typeof appRouter;
