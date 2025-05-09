import { IconCalendarFilled, IconCalendarDue } from "@tabler/icons-react";

const icons = {
  IconCalendarFilled,
  IconCalendarDue,
};

export const DoctorMenu = {
  id: "patient-main-Menu",
  title: "",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Set Availability",
      type: "item",
      url: "/dashboard",
      icon: icons.IconCalendarDue,
      breadcrumbs: false,
    },
  ],
};
