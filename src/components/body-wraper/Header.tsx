"use client"
import { usePathname } from "next/navigation";
import { PAGE_ROUTES } from "@/constants";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { SideBarContext } from "@/context/SideBarContext";
import { useIsMobile } from "@/hooks/useIsMobile";

const HEADER_HEIGHT = 70;

type HeaderProps = {
  children?: React.ReactNode
};

export const Header = ({ children}: HeaderProps) => {
  const pathname = usePathname();
  const currentPageName = Object.values(PAGE_ROUTES).find(route => route.path === pathname)?.name

    const { openSideBar } = useContext(SideBarContext);
    const isMobile = useIsMobile()

  return (
    <Box
      sx={(theme) => ({
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: theme.palette.BG.blue30,
        display: "flex",
        width: "100%",
        alignItems: "center",
        paddingX: {xs:1, sm: 2, md: 4},
        borderRadius:2,
        justifyContent:"space-between",
        overflowX:"hidden",
        gap: 1,

      })}
    >
      <Typography variant="h4" fontWeight="bold">{currentPageName}</Typography>
      <Box visibility={openSideBar && isMobile ? "hidden" : "visible"}>
      {children}
      </Box>
    </Box>
  );
};
