
"use client"
import { Box, useTheme } from "@mui/material";
import { Content } from "./Content";
import { Header } from "./Header";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { SideBarContext } from "@/context/SideBarContext";

type BodyWraperProps = {
    children: React.ReactNode
};

export const BodyWraper = ({children}: BodyWraperProps) => {
  const pathname = usePathname();
  const theme = useTheme()
    const { openSideBar, setOpenSideBar } = useContext(SideBarContext);
return (


    <Box sx={{ position:"absolute", display:"flex", flexDirection:"column", pl:4, py:4, m:0, width:"100%", gap:2, pr:openSideBar ? 32: 4,
             transition: theme.transitions.create("padding", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.complex,
          }),
    }}>
        <Header pathname={pathname}/>
        <Content>
            {children}
        </Content>
    </Box>

  );
};