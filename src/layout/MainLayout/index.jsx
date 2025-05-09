import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, Toolbar, styled } from "@mui/material";

import Header from "./Header";
import Sidebar from "./Sidebar";
import React from "react";
import { drawerWidth } from "../../utils/constant";

const Main = styled("main")(({ theme }) => ({
  ...theme.typography.mainContent,
  marginLeft: `${drawerWidth}px`,
  width: `calc(100% - ${drawerWidth}px)`,
  padding: "16px",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.down("md")]: {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: "10px",
  },
}));

const MainLayout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: theme.palette.background.default,
          transition: theme.transitions.create("width"),
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      <Sidebar drawerOpen={true} drawerToggle={() => {}} />
      <Main className="main-app-wrapper" id="main">
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainLayout;
