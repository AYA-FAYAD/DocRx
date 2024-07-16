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
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main>
        <SignedIn>
          <RouterProvider router={router} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>
    </div>
  );
}
