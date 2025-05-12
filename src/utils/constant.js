export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;


export const USER_ROLES = {
  PATIENT: 1,
  DOCTOR: 2,
};

export const USER_ROLES_MAPPER = {
  1: "Patient",
  2: "Doctor",
};

export const specializationOptions = [
  { label: "Orthopedics", value: 1 },
  { label: "Cardiology", value: 2 },
  { label: "Dermatology", value: 3 },
  { label: "General Surgery", value: 4 },
  { label: "Radiology", value: 5 },
];

export const SPECIALIZATION_MAPPER = {
  1: "Orthopedics",
  2: "Cardiology",
  3: "Dermatology",
  4: "General Surgery",
  5: "Radiology",
};

export const drawerWidth = 300;
export const headerHeight = 80;

export const DAYS = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 7 },
];


export const DAYS_MAPPER = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  7: "Sun",
}