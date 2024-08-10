import { router } from "../trpc";
import { doctorsRouter } from "./doctors";
import { userRouter } from "./users";

import { patientsRouter } from "./patients";

import { prescriptionsRouter } from "./prescriptions";

export const appRouter = router({
  user: userRouter,
  patient: patientsRouter,
  doctor: doctorsRouter,

  prescription: prescriptionsRouter,
});

export type AppRouter = typeof appRouter;
