"use client"
import { SideBarContext, SideBarProvider } from '@/context/SideBarContext'
import { Box, styled } from '@mui/material'
import { SideBar } from './SideBar'
import { useContext } from 'react';

const DRAWER_WIDTH = 240;

type NavigationProps = {
    children: React.ReactNode
}

export const Navigation = ({children}: NavigationProps) => {
  return (
    <SideBarProvider>
    <Box
      sx={{
        width: "100vw",
        paddingBottom: 1,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <SideBar drawerWidth={DRAWER_WIDTH}>
        <Main>

        <div>{children}</div>
        <Box
          sx={{
              bgcolor: "#ddc750",
              display: "flex",
              justifyContent: "center",
              padding: 1,
            }}
            >
          <h3>Footer</h3>
        </Box>
            </Main>
      </SideBar>
    </Box>
  </SideBarProvider>
  )
}


type MainProps = {
    children: React.ReactNode
}


  const Main = ({ children }: MainProps) => {

  const {openSideBar} = useContext(SideBarContext)
    return (
      <Box
        component="main"
        sx={(theme) => ({
          display: "flex",
          flex: 1,
          flexGrow: 1,
          marginTop: "70px",
          minHeight: "calc(100vh - 70px)",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingInline: 2,
          marginLeft: openSideBar ? 0 : `-${DRAWER_WIDTH}px`,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        })}
      >
        {children}
      </Box>
    );
  };