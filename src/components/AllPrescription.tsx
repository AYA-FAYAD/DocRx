import React, { useEffect, useState } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";
import PrescriptionDetail from "./PrescriptionDetail";

function AllPrescriptions() {
  const { user } = useUser();
  const [error, setError] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const {
    data: prescriptions,
    error: fetchError,
    isLoading,
  } = trpc.doctor.getPrescriptions.useQuery(
    { doctorClerkUserId: user?.id ?? "" },
    { enabled: !!user?.id }
  );

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message);
    }
  }, [fetchError]);

  if (isLoading) return <p>Loading...</p>;

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

export default AllPrescriptions;
