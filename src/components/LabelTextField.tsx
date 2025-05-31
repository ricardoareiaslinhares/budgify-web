import { Box, Grid, Input, InputLabel, InputProps, TextField, TextFieldProps } from "@mui/material";

type LabeledTextFieldProps  = {
    label: string
} & TextFieldProps;

export const LabeledTextField = ({ label, ...props }:LabeledTextFieldProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', width:{xs:"200px", sm:"300px"}}}>
    <InputLabel htmlFor={props.id} sx={{ fontWeight: 500, mb:-1.9  }}>{label}</InputLabel>
    <TextField {...props} />
  </Box>
);
