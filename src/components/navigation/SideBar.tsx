"use client"
import { Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Person as PersonIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Insights as InsightsIcon, Group as GroupIcon } from "@mui/icons-material";
import React, { useContext } from "react";
import {TopBar} from "./TopBar";
import { SideBarContext } from "@/context/SideBarContext";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));  


type SideBarProps = {
    drawerWidth: number,
    children?: React.ReactNode,
};

export const SideBar = ({
  drawerWidth,
  children,
}: SideBarProps) => {
  const theme = useTheme();
  const {openSideBar, setOpenSideBar} = useContext(SideBarContext)

  const handleClientsClick = (path: string) => {};

  // Prefecth Queries on hover, except if we are on the clients page

  const drawerItems = [
    { label: "Highlights", path: "/highlights", icon: <InsightsIcon /> },
    { label: "Statistics", path: "/statistics", icon: <PersonIcon /> },
    { label: "Users", path: "/users", icon: <GroupIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar
        drawerWidth={drawerWidth}
      />
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        variant="persistent"
        anchor="left"
        open={openSideBar}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 4,
          }}
        >
          <Typography variant="h6" noWrap component="div">
            Logo
          </Typography>
          <IconButton onClick={() => setOpenSideBar(prev => !prev)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {drawerItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleClientsClick(item.path)}
              >
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
