import { Typography } from "@mui/material";

import NavGroup from "./NavGroup";
import getMenuItemByRole from "../../../menuItems";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/Auth/Selectors";

const MenuList = () => {
  const user = useSelector(selectUser);
  const navItems = getMenuItemByRole(user?.user_type).map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
