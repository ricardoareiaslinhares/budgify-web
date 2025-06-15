"use client"
import { SideBarContext, SideBarProvider } from '@/context/SideBarContext'
import { Box} from '@mui/material'
import { SideBar } from './SideBar'
import { useContext } from 'react';
import { Footer } from '../Footer';
import { DRAWER_WIDTH, TOP_BAR_HEIGHT } from '@/constants';



type NavigationProps = {
  userName: string
    children: React.ReactNode
}

export const Navigation = ({children, userName}: NavigationProps) => {
  return (
    <SideBarProvider>
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <SideBar userName={userName}>
        <Main>

        {children}
{/* <Footer/> */}
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
          overflow:"auto",
          display: "flex",
          flex: 1,
          height:"100vh",
          marginTop: `${TOP_BAR_HEIGHT}px`,
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: theme.palette.background.default,
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