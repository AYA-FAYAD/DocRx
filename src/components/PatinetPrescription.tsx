import { useState } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";
import PrescriptionDetail from "./PrescriptionDetail";

function AllPatientPrescriptions() {
  const { user } = useUser();
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const {
    data: prescriptions,
    error,
    isLoading,
  } = trpc.patient.getPatientPrescrition.useQuery(
    { patientClerkId: user?.id ?? "" },
    { enabled: !!user?.id }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <h2>All Prescriptions</h2>
      <ul>
        {prescriptions && prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <li key={prescription.prescriptionId}>
              {prescription.drugName} - {prescription.dosage} -
              {prescription.doctorName} -{prescription.createdAt}
              <button onClick={() => setSelectedPrescription(prescription)}>
                View Details
              </button>
            </li>
          ))
        ) : (
          <p>No prescriptions found</p>
        )}
      </ul>
      {selectedPrescription && (
        <PrescriptionDetail prescription={selectedPrescription} />
      )}
    </div>
  );
}

export default AllPatientPrescriptions;
