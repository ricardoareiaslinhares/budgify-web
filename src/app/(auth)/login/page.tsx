import { Box, Grid, Typography } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { Logo } from "@/components/Logo";

type LoginProps = {};

export default function Login({}: LoginProps) {
  return (
    <Grid container sx={{ height: "100vh" }} justifyContent="start">
      <Grid size={{ xs: 12, sm: 4, md: 6.5, lg: 7.5 }}>
        <Box
          sx={{
            backgroundColor: "BG.blue30",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: { xs: 20, sm: 0 },
            borderTopRightRadius: { xs: 0, sm: 20 },
            borderBottomRightRadius: 20,
          }}
        >
          <Box
            width={{ xs: "300px", sm: "600px", md: "900px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box display="flex">
              <Logo width={900} height={300} adjustToParent={true} />
            </Box>

            <Typography pb={2} variant="h5">
              Super Admin
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginForm />
      </Box>
    </Grid>
  );
}