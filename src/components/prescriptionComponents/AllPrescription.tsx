import { useState, useEffect } from "react";
import { trpc } from "../../client";
import { useUser } from "@clerk/clerk-react";
import PrescriptionDetail from "./PrescriptionDetail";
import PrescriptionTable from "./prescriptionTable";

function AllUserPrescriptions() {
  console.log("test test");

  const { user } = useUser();
  const [role, setRole] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const {
    data: userRole,
    error: roleError,
    isLoading: roleLoading,
  } = trpc.user.getUserRole.useQuery(
    { clerkUserId: user?.id ?? "" },
    { enabled: !!user?.id }
  );

  useEffect(() => {
    if (userRole) {
      setRole(userRole.role);
    }
  }, [userRole]);

  const {
    data: prescriptions,
    error: fetchError,
    isLoading: prescriptionsLoading,
  } = trpc.prescription.getUserPrescriptions.useQuery(
    { userClerkId: user?.id ?? "" },
    { enabled: !!role } // Ensure query is enabled only if role is available
  );

  if (roleLoading || prescriptionsLoading) return <p>Loading...</p>;
  if (roleError) return <p>{roleError.message}</p>;
  if (fetchError) return <p>{fetchError.message}</p>;

  const handleSelectPrescription = (prescription: any) => {
    setShowDetails(true);
    setSelectedPrescription(prescription);
  };

  return (
    <div className="mt-20 justify-center">
      {showDetails && (
        <PrescriptionDetail
          setShowDetails={setShowDetails}
          prescription={selectedPrescription}
        />
      )}

      {!showDetails && (
        <PrescriptionTable
          prescriptions={prescriptions}
          onSelectPrescription={handleSelectPrescription}
          role={role}
        />
      )}
    </div>
  );
}

export default AllUserPrescriptions;
