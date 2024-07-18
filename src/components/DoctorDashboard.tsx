import React from "react";
import ProtectedPage from "./protectedPage";
import { Link } from "react-router-dom";
import SideBar from "./Box";

const DoctorDashboard = () => {
  return (
    <ProtectedPage allowedRole="doctor">
      <SideBar />
      <Link to="/addprescription">add prescription</Link>
    </ProtectedPage>
  );
};

export default DoctorDashboard;
