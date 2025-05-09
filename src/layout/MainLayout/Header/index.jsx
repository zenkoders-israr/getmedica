import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectUser } from "../../../redux/Auth/Selectors";
import { handleLogout } from "../../../redux/Auth/Reducer";
import { images } from "../../../assets/images";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    dispatch(handleLogout());
    localStorage.removeItem("@TOKEN");
    navigate("/login");
    handleCloseUserMenu();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <Box
        sx={{
          mr: 2,
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={images.NotificationIcon}
          alt="Notifications"
          style={{ width: 40, height: 40, mr: 1 }}
        />
      </Box>

      <Box sx={{ mr: 2, mt: 2, width: "8vw" }}>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontSize: "16px" }}
        >
          Welcome
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ fontSize: "18px" }}
        >
          {user?.name || "User"}
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user?.name || "U"} />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleLogoutClick}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
