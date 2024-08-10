import {
  UserButton,
  useUser,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import logo from "../assets/logo.png";
import useUserRole from "../hooks/useUserRole";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, isSignedIn } = useUser();
  const { role, isLoading, error } = useUserRole();

  console.log("role is :", role);
  return (
    <nav className="bg-transparent border-gray-200 dark:bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DocRx
          </span>
        </a>
        <div className="flex items-center font-medium md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isSignedIn ? (
            <SignInButton className="block py-2 px-3 text-gray-900 font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" />
          ) : (
            <UserButton />
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            {role === "doctor" && (
              <li>
                <Link
                  to="/doctor-dashboard"
                  className="
                 block py-2 px-3 text-gray-900 rounded hover:bg-gray-100
                 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white
                 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 
                 dark:hover:text-white md:dark:hover:bg-transparent 
                 dark:border-gray-700 
                "
                >
                  Doctor Dashboard
                </Link>
              </li>
            )}
            {isSignedIn ? (
              <li>
                <Link
                  to="/AllPrescription"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Prescription
                </Link>
              </li>
            ) : null}
            <li>
              {isSignedIn ? (
                <SignOutButton />
              ) : (
                <li>
                  <Link
                    to="/About"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
