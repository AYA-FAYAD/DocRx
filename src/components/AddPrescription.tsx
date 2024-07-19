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
    <form className="max-w-md mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Patient Email
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Drug Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Dosage
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          type="checkbox"
          checked={oneTimeUse}
          onChange={(e) => setOneTimeUse(e.target.checked)}
        />
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          One Time Use
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Usage Instructions
        </label>

        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
        ></textarea>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default AddPrescription;
//  <form onSubmit={handleSubmit}>
{
  /* <div>
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
</form> */
}
