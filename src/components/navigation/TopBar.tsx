"use client"


import {
  AppBar as MuiAppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { SideBarContext } from "@/context/SideBarContext";
import { useTheme } from "@mui/material/styles";
import { TOP_BAR_HEIGHT } from "@/constants";
import { Logo } from '../Logo';

export const TopBar = () => {
  const theme = useTheme()
  
  const {openSideBar, setOpenSideBar} = useContext(SideBarContext)

  const handlerOpenSideBar = () => {
    if (openSideBar) return
    setOpenSideBar(prev => !prev)
  }

  return (
      <MuiAppBar
        sx={{
          backgroundColor:theme.palette.BG.green30,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: "100%",
          position: "fixed",
          height:`${TOP_BAR_HEIGHT}px`
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handlerOpenSideBar}
            edge="start"
            sx={{
              color:theme.palette.BG.purple,
              cursor: openSideBar ? "default" : "pointer",
              opacity: openSideBar ? 0 : 1,
              transition:
                "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              transform: openSideBar ? "scale(0.95)" : "scale(1)",
              pointerEvents: openSideBar ? "none" : "auto",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              columnGap: 2,
              alignItems: "center",
            }}
          >

            <IconButton onClick={() => {}}>
              <Logo width={180}   height={69}/>
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppBar>
  );
};


