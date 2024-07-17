import React from "react";
import ProtectedPage from "./protectedPage";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  return (
    <ProtectedPage allowedRole="doctor">
      <h1>Doctor Dashboard</h1>
      <Link to="/">add prescription</Link>
      <p>
        Welcome to the doctor's dashboard. Here you can manage your patients and
        add prescription here
      </p>
    </ProtectedPage>
  );
};

export default DoctorDashboard;
