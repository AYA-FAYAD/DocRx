import { IoIosClose } from "react-icons/io";

import { useNavigate } from "react-router-dom";

function PrescriptionDetails({ prescription, setShowDetails }: any) {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="relative mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Prescription Details
        </h2>
        <button
          type="button"
          onClick={() => setShowDetails(false)}
          className="absolute top-0 right-0 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <IoIosClose size={24} />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <div className="text-lg">
        <p className="mb-2">
          <span className="font-semibold">Drug Name:</span>{" "}
          {prescription.drugName}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Dosage:</span> {prescription.dosage}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Usage Instructions:</span>{" "}
          {prescription.usageInstructions}
        </p>
        <p className="mb-2">
          {prescription.doctorName ? (
            <span>
              <span className="font-semibold">Doctor:</span>{" "}
              {prescription.doctorName}
            </span>
          ) : (
            <span>
              <span className="font-semibold">Patient:</span>{" "}
              {prescription.patientName}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default PrescriptionDetails;
