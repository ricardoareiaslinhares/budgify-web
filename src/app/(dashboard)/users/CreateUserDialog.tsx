"use client";

import { UserCreate } from "@/types/entities";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
  Box,
} from "@mui/material";
import { UseMutationResult } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

const genres = [
  { label: "Male", value: 0 },
  { label: "Female", value: 1 },
  { label: "Other", value: 2 },
];

type CreateUserDialogProps = {
  open: boolean;
  toggle: () => void;
  createRecordFn: UseMutationResult<
    UserCreate,
    void,
    { data: UserCreate },
    unknown
  >;
};
export const CreateUserDialog = ({
  open,
  toggle,
  createRecordFn,
}: CreateUserDialogProps) => {
  const entityForm = useForm({
    defaultValues: {
      name: "budgify1",
      email: "budgify1@teste.com",
      password: undefined,
      dateOfBirth: "2024-12-01",
      genre: 0,
      allowWalletWatch: true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = entityForm;

  const onSubmit = async (formData: any) => {
    await createRecordFn.mutateAsync({data:formData})
    toggle();
  };

  return (
    <Dialog open={open} onClose={toggle} maxWidth="sm" fullWidth>
      <DialogTitle>Create User</DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <TextField
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <TextField
                      type="password"
                      label="Password"
                      fullWidth
                      error={!!errors.password}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <TextField
                      type="date"
                      label="Date of Birth"
                      fullWidth
                      error={!!errors.dateOfBirth}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="genre"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="genre-label">Genre</InputLabel>
                      <Select labelId="genre-label" label="Genre" {...field}>
                        {genres.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="allowWalletWatch"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Allow Wallet Watch"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={toggle} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="warning" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
