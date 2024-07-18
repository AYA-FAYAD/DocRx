import { useState } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";

function AddPrescription() {
  const { user } = useUser();
  const [patientEmail, setPatientEmail] = useState("");
  const [drugName, setDrugName] = useState("");
  const [dosage, setDosage] = useState("");
  const [usageInstructions, setUsageInstructions] = useState("");
  const [oneTimeUse, setOneTimeUse] = useState(false);

  const addPrescriptionMutation = trpc.doctor.addprescriptions.useMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPrescriptionMutation.mutateAsync({
        doctorClerkUserId: user.id,
        patientEmail,
        drugName,
        dosage,
        usageInstructions,
        oneTimeUse,
      });
      alert("Prescription added successfully");
    } catch (error) {
      console.error("Error adding prescription:", error);
      alert("Failed to add prescription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Patient Email:
          <input
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Drug Name:
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Dosage:
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Usage Instructions:
          <input
            type="text"
            value={usageInstructions}
            onChange={(e) => setUsageInstructions(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          One Time Use:
          <input
            type="checkbox"
            checked={oneTimeUse}
            onChange={(e) => setOneTimeUse(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit">Add Prescription</button>
    </form>
  );
}

export default AddPrescription;
