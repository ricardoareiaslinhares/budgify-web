"use client";
import { AppDialogContext } from "@/context/AppDialogContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useContext } from "react";

type onCloseReason = "backdropClick" | "escapeKeyDown";

export const AppDialog = () => {
  const appDialog = useContext(AppDialogContext)!;

  const handleClose = (e: any, reason: onCloseReason) => {
    appDialog.toggleOpen();
  };
  const handleAction = () => {
    if (appDialog.action) appDialog.action();
    appDialog.toggleOpen();
  };

  return (
    <Dialog
      open={appDialog.open}
      onClose={handleClose}
      aria-labelledby={appDialog.content.title}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id={appDialog.content.title}>
        {appDialog.content.title}
      </DialogTitle>
      <DialogContent>
        <Typography>{appDialog.content.description}</Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 4 }}>
        <Button onClick={appDialog.toggleOpen} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAction} color="warning" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
