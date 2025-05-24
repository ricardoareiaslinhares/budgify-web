"use client";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled, useTheme, Theme } from "@mui/material/styles";
import {
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Insights as InsightsIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import React, { SetStateAction, useContext } from "react";
import { TopBar } from "./TopBar";
import { SideBarContext } from "@/context/SideBarContext";

type SideBarProps = {
  drawerWidth: number;
  children?: React.ReactNode;
};

export const SideBar = ({ drawerWidth, children }: SideBarProps) => {
  const theme = useTheme();
  const { openSideBar, setOpenSideBar } = useContext(SideBarContext);

  const handleClientsClick = (path: string) => {};

  const drawerItems = [
    { label: "Highlights", path: "/highlights", icon: <InsightsIcon /> },
    { label: "Statistics", path: "/statistics", icon: <PersonIcon /> },
    { label: "Users", path: "/users", icon: <GroupIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <TopBar />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openSideBar}
      >
        <DrawerHeader theme={theme} setOpenSideBar={setOpenSideBar} />
        <List>
          {drawerItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleClientsClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {children}
    </Box>
  );
};

type DrawerHeaderProps = {
  theme: Theme;
  setOpenSideBar: React.Dispatch<SetStateAction<boolean>>;
};
const DrawerHeader = ({ theme, setOpenSideBar }: DrawerHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight:1,
        paddingLeft: 4,
        ...theme.mixins.toolbar,
      }}
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" noWrap component="div">
          Logo
        </Typography>
      </Box>
      <IconButton size="medium" onClick={() => setOpenSideBar((prev) => !prev)}>
        <ChevronLeftIcon />
      </IconButton>
    </Box>
  );
};
