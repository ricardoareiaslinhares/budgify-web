"use client";
import { Box, Container, useTheme } from "@mui/material";

type ContentProps = {
  children: React.ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: theme.palette.BG.blue30, borderRadius:2, }}>{children}</Box>
  );
};
