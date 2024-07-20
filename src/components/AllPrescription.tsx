import React, { useEffect, useState } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";

function AllPrescriptions() {
  const { user } = useUser();
  const [error, setError] = useState(null);

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
      {error && <p>{error}</p>}
      <div>
        <h2>Prescriptions</h2>
        <ul>
          {prescriptions && prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <li key={prescription.id}>
                {prescription.drugName} - {prescription.dosage}
              </li>
            ))
          ) : (
            <p>No prescriptions found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AllPrescriptions;
