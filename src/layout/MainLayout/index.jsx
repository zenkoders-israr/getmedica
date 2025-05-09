import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, Toolbar, styled } from "@mui/material";

import Header from "./Header";
import Sidebar from "./Sidebar";
import React from "react";
import { drawerWidth, headerHeight } from "../../utils/constant";
import { colors } from "../../theme/colors";

const Main = styled("main")(({ theme }) => ({
  ...theme.typography.mainContent,
  width: `calc(100% - ${drawerWidth}px)`,
  padding: "16px",
  marginTop: `${headerHeight}px`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),

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
          backgroundColor: `${colors.secondaryBgColor}`,
          height: '80px'
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
