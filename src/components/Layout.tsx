import Footer from "./Footer";
import Navebar from "./naveBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navebar />
      <main className="flex-grow bg-transparent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
