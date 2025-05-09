import { USER_ROLES } from "../../utils/constant";
import { DoctorMenu } from "./DoctorMenu";
import { PatientMenu } from "./PatientMenu";


const getMenuItemByRole = (role) => {
  switch (role) {
    case USER_ROLES.DOCTOR:
      return [DoctorMenu];
    case USER_ROLES.PATIENT:
      return [PatientMenu];
    default:
      return [];
  }
};

export default getMenuItemByRole
