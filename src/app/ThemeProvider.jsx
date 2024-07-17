"use client";
import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "../config/theme";

export default function ClientThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
