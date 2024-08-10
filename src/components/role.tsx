import { useState, useEffect } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function SetRole() {
  const navigate = useNavigate();
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
    if (user) setClerkUserId(user.id);
  }, [user]);

  const resetForm = () => {
    setNewRole("");
    setSpecialization("");
    setClinicAddress("");
    setDoctorPhoneNumber("");
    setPatientPhoneNumber("");
  };

  const handleUpdateRole = async (e: Event) => {
    e.preventDefault();
    ("Form submitted");

    try {
      await mutation.mutateAsync({ clerkUserId, newRole });

      if (newRole === "doctor") {
        await addDoctorInfo.mutateAsync({
          clerkUserId,
          specialization,
          clinicAddress,
          phoneNumber: doctorPhoneNumber,
        });
      } else if (newRole === "patient") {
        await addPatientInfo.mutateAsync({
          clerkUserId,
          phoneNumber: patientPhoneNumber,
        });
      }

      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Update User Role</h1>
      <form onSubmit={handleUpdateRole} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            readOnly
            value={user?.emailAddresses[0]?.emailAddress}
            placeholder="Enter user email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={newRole}
            onChange={(e) => {
              setNewRole(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        {newRole === "doctor" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="Enter specialization"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clinic Address
              </label>
              <input
                type="text"
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
                placeholder="Enter clinic address"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={doctorPhoneNumber}
                onChange={(e) => setDoctorPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
        {newRole === "patient" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={patientPhoneNumber}
              onChange={(e) => setPatientPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Update Role
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetRole;
