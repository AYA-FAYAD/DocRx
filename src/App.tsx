import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignInButton,
  UserButton,
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

import SignupForm from "./components/signUpForm.tsx";
import LogIn from "./components/logIn.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignupForm />} />
    </>
  )
);

export default function App() {
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
