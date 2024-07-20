import React from "react";

function PrescriptionDetail({ prescription }) {
  return (
    <div>
      <h2>Prescription Details</h2>
      <p>Drug Name: {prescription.drugName}</p>
      <p>Dosage: {prescription.dosage}</p>
      <p>Usage Instructions: {prescription.usageInstructions}</p>
      <p>Doctor: {prescription.doctorName}</p>
    </div>
  );
}

export default PrescriptionDetail;
