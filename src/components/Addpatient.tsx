import { useState, useEffect } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";

function AddPatient() {
  const { user } = useUser();
  const [patienEmail, setPatientEmail] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const addNewPatient = trpc.doctor.addPatient.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewPatient.mutateAsync({
        email: patienEmail,
        name: patientName,
        phoneNumber: patientPhone,
      });
      console.log("patient add");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>add new patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Patient Email:
            <input
              type="email"
              value={patienEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Patient Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Patient PhoneNumber:
            <input
              type="text"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;
