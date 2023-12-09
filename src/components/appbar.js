import { Avatar, Typography } from "@mui/material";
import React, { Component } from "react";
import Logo from "./appsdeployer_logo.jpeg";
import Box from "@mui/material/Box";

const DrawerAppBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          marginLeft: "50px",
          lineHeight: "36px",
          padding: "15px 0px",
        }}
      >
        WhiteBoard
      </Typography>
    </Box>
  );
};

export default DrawerAppBar;
