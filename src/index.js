import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StickyNote from "./components/sticky_notes";
import { Typography } from "@mui/material";
import HomePage from "./homepage";
import Box from "@mui/material/Box";
import BackgroundImg from "../src/components/background_image.png";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Box
    // sx={{
    //   backgroundImage: `url(${BackgroundImg})`,
    //   backgroundSize: "cover",
    //   minHeight: "100vh", // Set the minimum height to cover the entire screen
    //   position: "relative",
    // }}
    >
      <HomePage />
    </Box>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
