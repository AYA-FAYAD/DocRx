import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignInButton,
  UserButton,
  useUser,
  UserProfile,
} from "@clerk/clerk-react";
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AddPrescription from "./components/AddPrescription.tsx";
import AddPatient from "./components/Addpatient.tsx";
import AllPrescrioption from "./components/AllPrescription.tsx";
import Navebar from "./components/naveBar.tsx";
import AllPatientPrescriptions from "./components/PatinetPrescription.tsx";
import { HomePage } from "./pages/homePage.tsx";
import NotFoundPage from "./pages/notFoundPage.tsx";
import SetRole from "./components/role.tsx";
import DoctorDashboard from "./components/DoctorDashboard.tsx";

import SignupForm from "./components/signUpForm.tsx";
import LogIn from "./components/logIn.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/selectrole" element={<SetRole />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/addprescription" element={<AddPrescription />} />
      <Route path="/addpatient" element={<AddPatient />} />
      <Route path="/AllPrescription" element={<AllPrescrioption />} />
      <Route
        path="/AllPatientPrescription"
        element={<AllPatientPrescriptions />}
      />
    </>
  )
);

export default function App() {
  const { user, isSignedIn } = useUser();
  console.log(user);
  console.log("is user logged in? ", isSignedIn);
  return (
    <div>
      <header>
        <Navebar />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn></SignedIn>
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}
