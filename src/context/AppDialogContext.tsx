"use client"
import React, { createContext, SetStateAction, useCallback, useState } from "react";

export type AppDialog = {
  title: string;
  description: string;
};

type AppDialogContextType = {
  open: boolean;
  content: AppDialog;
  toggleOpen: () => void;
  setContent:React.Dispatch<React.SetStateAction<AppDialog>>
  action: (() => void) | null;
  setAction: React.Dispatch<SetStateAction<(() => void) | null>>
};

export const AppDialogContext = createContext<AppDialogContextType | undefined>(undefined);

type AppDialogProviderProps = {
  children: React.ReactNode;
};

export const AppDialogProvider = ({ children }: AppDialogProviderProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<AppDialog>({
    title: "",
    description: "",
  });

  const [action, setAction] = useState<(()=>void)|null>(null);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);


  return (
    <AppDialogContext.Provider value={{open, content, toggleOpen, setContent, action, setAction}}>
      {children}
    </AppDialogContext.Provider>
  );
};

export const useAppDialog = (): AppDialogContextType => {
  const context = React.useContext(AppDialogContext);
  if (context === undefined) {
    throw new Error("useAppDialog must be used within an AppDialogProvider");
  }
  return context;
};