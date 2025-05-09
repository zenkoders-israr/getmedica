import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
function DoctorDetails() {
  const { state } = useLocation();


  useEffect(() => {
// Api get called
  }, [state?.doc_id])
  return <div>DoctorDetails</div>;
}

export default DoctorDetails;
