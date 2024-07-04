import { useState, useEffect } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";

function SetRole() {
  const { user } = useUser();
  const [clerkUserId, setClerkUserId] = useState("");
  const [newRole, setNewRole] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [doctorPhoneNumber, setDoctorPhoneNumber] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");
  const mutation = trpc.user.upduterole.useMutation();
  const addDoctorInfo = trpc.doctor.adddoctorinfo.useMutation();
  const addPatientInfo = trpc.patient.addpatientinfo.useMutation();

  useEffect(() => {
    if (user) {
      setClerkUserId(user.id);
    }
  }, [user]);

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await mutation.mutateAsync({
        clerkUserId,
        newRole,
      });
      console.log("Role updated:", updatedUser);

      if (newRole === "doctor") {
        await addDoctorInfo.mutateAsync({
          clerkUserId,
          specialization,
          clinicAddress,
          phoneNumber: doctorPhoneNumber,
        });
        console.log("Doctor info added");
      } else if (newRole === "patient") {
        await addPatientInfo.mutateAsync({
          clerkUserId,
          phoneNumber: patientPhoneNumber,
        });
        console.log("Patient info added");
      }

      setNewRole("");
      setSpecialization("");
      setClinicAddress("");
      setDoctorPhoneNumber("");
      setPatientPhoneNumber("");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div>
      <h1>Update User Role</h1>
      <form onSubmit={handleUpdateRole}>
        <input
          type="email"
          readOnly={true}
          value={user?.emailAddresses[0]?.emailAddress}
          placeholder="Enter user email"
        />
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Enter new role"
        />
        {newRole === "doctor" && (
          <>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Enter specialization"
            />
            <input
              type="text"
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              placeholder="Enter clinic address"
            />
            <input
              type="text"
              value={doctorPhoneNumber}
              onChange={(e) => setDoctorPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </>
        )}
        {newRole === "patient" && (
          <>
            <input
              type="text"
              value={patientPhoneNumber}
              onChange={(e) => setPatientPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />
          </>
        )}
        <button type="submit">Update Role</button>
      </form>
    </div>
  );
}

export default SetRole;
