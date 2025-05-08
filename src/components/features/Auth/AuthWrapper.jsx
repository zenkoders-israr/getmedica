import React from "react";
import { Box,  Typography, Container } from '@mui/material';


function AuthWrapper({ title = "Login", children }) {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          backgroundColor: "#fff",
          width: "50%"
        }}
      >
        <Typography variant="h5" fontWeight={600} align="center">
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  );
}

export default AuthWrapper;
