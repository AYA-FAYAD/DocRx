import {
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
  UserProfile,
  SignUp,
} from "@clerk/clerk-react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AddPrescription from "./components/doctorComponents/AddPrescription.tsx";
import AddPatient from "./components/doctorComponents/Addpatient.tsx";
import AllUserPrescriptions from "./components/prescriptionComponents/AllPrescription.tsx";
import ProtectedPage from "./components/protectedPage.tsx";
import { HomePage } from "./pages/homePage.tsx";
import NotFoundPage from "./pages/notFoundPage.tsx";
import SetRole from "./components/role.tsx";
import DoctorDashboard from "./components/doctorComponents/DoctorDashboard.tsx";
import FindPatient from "./components/doctorComponents/FindPatient.tsx";
import CenteredSignUp from "./pages/Singup.tsx";
import { About } from "./components/About.tsx";

import Layout from "./components/Layout.tsx";
import "./App.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/signup" element={<CenteredSignUp />} />
        <Route path="/selectrole" element={<SetRole />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedPage allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedPage>
          }
        />
        <Route
          path="/addprescription"
          element={
            <ProtectedPage allowedRole="doctor">
              <AddPrescription />
            </ProtectedPage>
          }
        />
        <Route
          path="/addpatient"
          element={
            <ProtectedPage allowedRole="doctor">
              <AddPatient />
            </ProtectedPage>
          }
        />
        <Route
          path="/Allprescription"
          element={
            <ProtectedPage allowedRole={["patient", "doctor"]}>
              <AllUserPrescriptions />
            </ProtectedPage>
          }
        />
        <Route
          path="/FindPatient"
          element={
            <ProtectedPage allowedRole="doctor">
              <FindPatient />
            </ProtectedPage>
          }
        />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <div>
      {/* <SignedOut>
        <RedirectToSignIn />
      </SignedOut> */}

      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}
