import { Box } from "@mui/material";

type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  return (
        <Box
          sx={{
              bgcolor: "#ddc750",
              display: "flex",
              justifyContent: "center",
            }}
            >
          <h3>Footer</h3>
        </Box>
  );
};