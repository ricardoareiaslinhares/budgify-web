"use client"
import {
  AppBar as MuiAppBar,
  IconButton,
  styled,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useContext } from "react";
import { SideBarContext } from "@/context/SideBarContext";

type Props = {
  drawerWidth: number;
};
export const TopBar = ({ drawerWidth }: Props) => {
  const goBack = () => {};
  
  const {openSideBar, setOpenSideBar} = useContext(SideBarContext)

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<{ open?: boolean }>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
    marginLeft: open ? `${drawerWidth}px` : 0,
  }));

  return (
    <AppBar position="fixed" open={openSideBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => setOpenSideBar(prev => !prev)}
          edge="start"
          sx={{ mr: 4, ...(openSideBar && { display: "none" }) }}
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
          <Box
            sx={{
             // display: location.pathname === "/" ? "hidden" : "flex",
            }}
          >
            <IconButton
              onClick={goBack}
              sx={{
               // opacity: location.pathname === "/" ? 0 : 1,
               // transition: "opacity 0.3s ease-in-out",
                //pointerEvents: location.pathname === "/" ? "none" : "auto",
              }}
            >
              <ArrowBackIcon fontSize="large" sx={{ color: "black" }} />
            </IconButton>
          </Box>

          <IconButton onClick={() => {}}>
            <Typography variant="h6" noWrap>
              Budgify
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


