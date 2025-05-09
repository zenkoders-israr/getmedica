import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const Icon = item.icon;
  const itemIcon = Icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon fontSize={level > 0 ? "inherit" : "medium"} />
  );
  const isSelected = pathname.includes(item.url);
  let listItemProps;
  if (item?.external) {
    listItemProps = {
      component: "a",
      href: item.url,
      target: item.target ? "_blank" : "_self",
    };
  } else {
    listItemProps = {
      component: forwardRef((props, ref) => (
        <Link
          ref={ref}
          {...props}
          to={item.url}
          target={item.target ? "_blank" : "_self"}
        />
      )),
    };
  }

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      selected={isSelected}
      sx={{
        mb: 0.5,
        alignItems: "flex-start",
        borderRadius: 2,
        backgroundColor: isSelected ? "#FFFFFF !important" : "inherit",
      }}
    >
      <ListItemIcon
        className="navigational-icon"
        sx={{
          my: "auto",
          minWidth: !item?.icon ? 18 : 36,
          color: isSelected ? "#18A0FB" : "white",
        }}
      >
        {itemIcon}
      </ListItemIcon>

      <ListItemText
        className="navigation-item-text"
        primary={
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: isSelected ? "#18A0FB" : "white",
            }}
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />

    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    caption: PropTypes.string,
    chip: PropTypes.object,
    external: PropTypes.bool,
    target: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
  level: PropTypes.number,
};

export default NavItem;
