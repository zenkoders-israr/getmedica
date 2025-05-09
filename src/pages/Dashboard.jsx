import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/Selectors";
import { USER_ROLES } from "../utils/constant";
import DoctorListening from "../components/features/DoctorListening";
import Availability from "../components/features/Availability";
function Dashboard() {
    const user = useSelector(selectUser)
  return  user?.user_type === USER_ROLES.DOCTOR ? <Availability />: <DoctorListening />;
}

export default Dashboard;
