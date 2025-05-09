
export const BACKEND_API_URL = import.meta.env.BACKEND_API_URL;

export const USER_ROLES = {
  PATIENT: 1,
  DOCTOR: 2,
};

export const USER_ROLES_MAPPER = {
  1: "Patient",
  2: "Doctor",
};

export const specializationOptions = [
  { label: 'Orthopedics', value: 1 },
  { label: 'Cardiology', value: 2 },
  { label: 'Dermatology', value: 3 },
  { label: 'General Surgery', value: 4 },
  { label: 'Radiology', value: 5 },
];


export const drawerWidth = 300