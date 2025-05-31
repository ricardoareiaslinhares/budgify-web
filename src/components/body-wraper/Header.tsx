import { PAGE_ROUTES } from "@/constants";
import { Box, Typography } from "@mui/material";

const HEADER_HEIGHT = 70;

type HeaderProps = {pathname:string};

export const Header = ({pathname}: HeaderProps) => {

  const currentPageName = Object.values(PAGE_ROUTES).find(route => route.path === pathname)?.name

  return (
    <Box
      sx={(theme) => ({
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: theme.palette.BG.blue30,
        display: "flex",
        alignItems: "center",
        paddingX: 4,
        borderRadius:2
      })}
    >
      <Typography variant="h4" fontWeight="bold">{currentPageName}</Typography>
    </Box>
  );
};
