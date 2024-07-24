import {
  SignedIn,
  SignedOut,
  SignInButton,
  useUser,
  UserProfile,
  RedirectToSignIn,
  RedirectToOrganizationProfile,
} from "@clerk/clerk-react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AddPrescription from "./components/AddPrescription.tsx";
import AddPatient from "./components/Addpatient.tsx";
import AllUserPrescriptions from "./components/AllPrescription.tsx";
import ProtectedPage from "./components/protectedPage.tsx";
import { HomePage } from "./pages/homePage.tsx";
import NotFoundPage from "./pages/notFoundPage.tsx";
import SetRole from "./components/role.tsx";
import DoctorDashboard from "./components/DoctorDashboard.tsx";
import FindPatient from "./components/FindPatient.tsx";

import Layout from "./components/Layout.tsx";
import "./App.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignupForm />} /> */}
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
        <Route path="/Allprescription" element={<AllUserPrescriptions />} />
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
  const { user, isSignedIn } = useUser();
  console.log(user);
  console.log("is user logged in? ", isSignedIn);
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
