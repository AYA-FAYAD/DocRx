import { useState, useEffect } from "react";
import { trpc } from "../client";
import { useUser } from "@clerk/clerk-react";
import PrescriptionDetail from "./PrescriptionDetail";
import PrescriptionTable from "./prescriptionTable";

function PatientSearchByPhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchInput, setSearchInput] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  const {
    data: prescriptions,
    error: fetchError,
    isLoading: prescriptionsLoading,
    refetch,
  } = trpc.doctor.getPatientByNumber.useQuery(searchInput, {
    enabled: false, // Disable automatic fetching
  });

  useEffect(() => {
    if (searchInput) {
      refetch();
    }
  }, [searchInput, refetch]);

  const handleSearch = () => {
    if (!phoneNumber || !userId) {
      alert("Please enter a phone number and ensure you are logged in.");
      return;
    }
    setSearchInput({
      phoneNumber,
      userClerkId: userId,
    });
  };

  return (
    <div className="mt-20 justify-center">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Enter patient's phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button
          onClick={handleSearch}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      {fetchError && (
        <p className="text-red-500">Error: {fetchError.message}</p>
      )}
      {selectedPrescription ? (
        <PrescriptionDetail prescription={selectedPrescription} />
      ) : (
        prescriptions &&
        prescriptions.length > 0 && (
          <PrescriptionTable
            prescriptions={prescriptions}
            onSelectPrescription={setSelectedPrescription}
          />
        )
      )}
    </div>
  );
}

export default PatientSearchByPhoneNumber;
