"use client";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import { Header } from "./Header";
import { useContext } from "react";
import { SideBarContext } from "@/context/SideBarContext";
import { DRAWER_WIDTH } from "@/constants";

type BodyWraperProps = {
  children: React.ReactNode;
  customHeaderRightSide?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export const BodyWraper = ({
  children,
  customHeaderRightSide,
  sx,
}: BodyWraperProps) => {
  const theme = useTheme();
  const { openSideBar } = useContext(SideBarContext);
  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        px: { xs: 0, md: 4 },
        py: 4,
        m: 0,
        width: openSideBar ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        gap: 2,
        transition: theme.transitions.create("padding", {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.complex,
        }),
      }}
    >
      <Box px={{xs:1, sm: 0}}>

      <Header>{customHeaderRightSide}</Header>
      </Box>

      <Box
        sx={{
          backgroundColor: { xs: "transparent", sm: theme.palette.BG.blue30 },
          transition: () =>
            theme.transitions.create("background-color", {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          borderRadius: 2,
          overflowX: "hidden",
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
