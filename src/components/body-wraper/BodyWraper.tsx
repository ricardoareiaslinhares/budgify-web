
"use client"
import { Box, Container, useTheme } from "@mui/material";
import { Content } from "./Content";
import { Header } from "./Header";
import { usePathname } from "next/navigation";

type BodyWraperProps = {
    children: React.ReactNode
};

export const BodyWraper = ({children}: BodyWraperProps) => {
  const pathname = usePathname();
return (
    <Box sx={{ display:"flex", flexDirection:"column", padding:0, m:0, width:"100%", gap:2}}>
        <Header pathname={pathname}/>
        <Content>
            {children}
        </Content>
    </Box>
  );
};