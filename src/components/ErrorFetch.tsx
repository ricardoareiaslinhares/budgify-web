import { Box, Typography } from "@mui/material";

type ErrorFetchProps = {};

export const ErrorFetch = ({}: ErrorFetchProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        minHeight: "50px",
      }}
    >
      <Typography variant="h5">
      Unable to load the data. Please try again or come back later.
      </Typography>
    </Box>
  );
};
