const PrescriptionTable = ({
  prescriptions,
  onSelectPrescription,
  role,
}: any) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Drug Name
            </th>
            <th scope="col" className="px-6 py-3">
              Dosage
            </th>
            <th scope="col" className="px-6 py-3">
              {role === "patient" ? "Doctor Name" : "Patient Name"}
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription: any) => (
            <tr
              key={prescription.prescriptionId}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {prescription.drugName}
              </td>
              <td className="px-6 py-4">{prescription.dosage}</td>
              <td className="px-6 py-4">
                {role === "patient"
                  ? prescription.doctorName
                  : prescription.patientName}
              </td>
              <td className="px-6 py-4">{prescription.createdAt}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onSelectPrescription(prescription)}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionTable;
