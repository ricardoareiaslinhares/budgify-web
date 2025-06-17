"use client";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { LabeledTextField } from "@/components/LabelTextField";
import { useLogin } from "@/hooks/useLogin";
import { AxiosError } from "axios";

type LoginProps = {};

export function LoginForm({}: LoginProps) {
  const { mutate, error, isError } = useLogin();
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (isError && error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 500) {
        setLoginError("Email or password incorrect");
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    }
  }, [isError, error]);

  type LoginFormInputs = { email: string; password: string };

  const { handleSubmit, control } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    mutate(data);
  };

  return (
    <Grid
      size={{ xs: 12, sm: 8, md: 4 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h3" mb={4}>
          Welcome
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, mx: 4 }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <LabeledTextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <LabeledTextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />

          {loginError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {loginError}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 2.5 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
