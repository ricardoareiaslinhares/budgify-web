"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { LabeledTextField } from "@/components/LabelTextField";
import { useLogin } from "@/hooks/useLogin";

type LoginProps = {};

export function LoginForm({}: LoginProps) {
  const {mutate, error, isError} = useLogin();
  /*     const [formErrors, setFormErrors] = useState<AuthErrors>();



 

    useEffect(() => {
        if (isError && error) {
            setFormErrors(error.response?.data as AuthErrors);
        }
    }, [isError, error]); */

  const [formErrors, setFormErrors] = useState();

  type LoginFormInputs = { email: string; password: string };

  const {
    handleSubmit,
    control,
    formState: { errors: fieldErrors },
  } = useForm<LoginFormInputs>();


   const onSubmit = async (data:LoginFormInputs) => {
         mutate(data);
        //console.log("result =>", result.data); // Delete
          //localStorage.setItem("authToken",  result.data.token)

        
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
          sx={{ mt: 1, mx:4 }}
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
          {fieldErrors.email && (
            <Typography color="error">{"fieldErrors.email.message"}</Typography>
          )}
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
          {fieldErrors.password && (
            <Typography color="error">
              {"fieldErrors.password.message"}
            </Typography>
          )}

          {/*      {formErrors
                        ? formErrors.errors.map((error: any) => (
                              <Typography color="error" key={error.message}>
                                  {error.message}
                              </Typography>
                          ))
                        : null} */}
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
