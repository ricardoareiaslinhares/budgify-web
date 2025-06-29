"use client";
import {
  Box,
  Button,
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
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import React, { SetStateAction, useContext, useEffect } from "react";
import { TopBar } from "./TopBar";
import { SideBarContext } from "@/context/SideBarContext";
import { API_ROUTES, DRAWER_WIDTH, PAGE_ROUTES, TOP_BAR_HEIGHT } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import axios from "axios";

type SideBarProps = {
  userName: string;
  children?: React.ReactNode;
};

export const SideBar = ({ children, userName }: SideBarProps) => {
  const theme = useTheme();
  const { openSideBar, setOpenSideBar } = useContext(SideBarContext);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setOpenSideBar(false);
    }
  }, [isMobile, setOpenSideBar]);

  const router = useRouter();
  const currentPath = usePathname();

  const handleLogout = async () => {
        await axios.post(API_ROUTES.logout.api);
        router.push(PAGE_ROUTES.login.path)
        
  }

  const drawerItems = [
    {
      label: PAGE_ROUTES.highlights.name,
      path: PAGE_ROUTES.highlights.path,
      icon: <HomeIcon />,
    },
    {
      label: PAGE_ROUTES.stats.name,
      path: PAGE_ROUTES.stats.path,
      icon: <InsightsIcon />,
    },
    {
      label: PAGE_ROUTES.users.name,
      path: PAGE_ROUTES.users.path,
      icon: <GroupIcon />,
    },
  ];

  const handleNaviagtion = (path: string) => {
    router.push(path)
    if (isMobile) setOpenSideBar(false)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar />

      <Drawer
        sx={{
          width: `${DRAWER_WIDTH}px`,
          "& .MuiDrawer-paper": {
            width: `${DRAWER_WIDTH}px`,
            borderRight: "none",
            boxShadow: "none",
            backgroundColor: theme.palette.BG.blue30,
            marginTop: `${TOP_BAR_HEIGHT}px`,
          },
        }}
        variant="persistent"
        anchor="left"
        open={openSideBar}
      >
        <DrawerHeader
          theme={theme}
          setOpenSideBar={setOpenSideBar}
          userName={userName}
        />
        <List
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            mt: `${TOP_BAR_HEIGHT}px`,
            pt: 2,
            transform: `translateY(-${TOP_BAR_HEIGHT}px)`,
          }}
        >
          <Box>
            {drawerItems.map((item, index) => {
              const isSelected = currentPath === item.path;

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.main,
                      },
                    }}
                    onClick={() => handleNaviagtion(item.path)}
                    selected={isSelected}
                  >
                    <Box
                      display="flex"
                      flex={1}
                      flexDirection="row"
                      alignItems="center"
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </Box>
                    <ListItemIcon
                      sx={{ display: "flex", justifyContent: "end" }}
                    >
                      <ChevronRightIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
          <ListItem
            disablePadding
            sx={{
              px: 1,
            }}
          >
            <IconButton
              onClick={handleLogout}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            >
              <LogoutIcon fontSize="large" />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>

      {children}
    </Box>
  );
};

type DrawerHeaderProps = {
  theme: Theme;
  userName: string;
  setOpenSideBar: React.Dispatch<SetStateAction<boolean>>;
};
const DrawerHeader = ({
  theme,
  setOpenSideBar,
  userName,
}: DrawerHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 1,
        paddingTop: 2,
        ...theme.mixins.toolbar,
      }}
    >
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <Avatar name={userName} />
      </Box>
      <IconButton size="medium" onClick={() => setOpenSideBar((prev) => !prev)}>
        <ChevronLeftIcon />
      </IconButton>
    </Box>
  );
};
type AvatarProps = { name: string };
const Avatar = ({ name }: AvatarProps) => {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap={1.5}
    >
      <Typography fontSize="60px" display="flex">
        <AccountCircleIcon fontSize="inherit" />
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Typography variant="h6" noWrap>
          {name}
        </Typography>
        <Typography variant="body1" color="textDisabled" noWrap>
          Super Admin
        </Typography>
      </Box>
    </Box>
  );
};
