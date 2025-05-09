import { IconCalendarFilled, IconCalendarDue } from "@tabler/icons-react";

const icons = {
  IconCalendarFilled,
  IconCalendarDue,
};

export const PatientMenu = {
  id: "patient-main-Menu",
  title: "",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Doctor List",
      type: "item",
      url: "/dashboard",
      icon: icons.IconCalendarDue,
      breadcrumbs: false,
    },
    {
      id: "my-profile",
      title: "Appointments",
      type: "item",
      url: "#",
      icon: icons.IconCalendarFilled,
      breadcrumbs: false,
    },
  ],
};
