"use client";
import { Box, useTheme } from "@mui/material";
import { Header } from "./Header";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { SideBarContext } from "@/context/SideBarContext";

type BodyWraperProps = {
  children: React.ReactNode;
  customHeaderRightSide?: React.ReactNode
};

export const BodyWraper = ({ children, customHeaderRightSide}: BodyWraperProps) => {
  const pathname = usePathname();
  const theme = useTheme();
  const { openSideBar, setOpenSideBar } = useContext(SideBarContext);
  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        pl: 4,
        py: 4,
        m: 0,
        width: "100%",
        gap: 2,
        pr: openSideBar ? 32 : 4,
        transition: theme.transitions.create("padding", {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.complex,
        }),
      }}
    >
      <Header pathname={pathname} >{customHeaderRightSide}</Header>

      <Box sx={{ backgroundColor: theme.palette.BG.blue30, borderRadius: 2 }}>
        {children}
      </Box>
    </Box>
  );
};
