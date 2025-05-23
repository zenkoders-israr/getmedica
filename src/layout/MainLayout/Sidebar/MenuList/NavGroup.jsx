import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Typography, List, Divider } from "@mui/material";

import NavItem from "./NavItem";

const NavGroup = ({ item }) => {
  const theme = useTheme();

  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
        className="sidebar-upper-navigation"
      >
        {items}
      </List>

      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
