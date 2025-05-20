"use client";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { useState } from "react";

type SideBarState = {
  openSideBar: boolean;
  setOpenSideBar: Dispatch<SetStateAction<boolean>>;
};

type SideBarContextProviderProps = {
  children: ReactNode;
};

const initialState = {
  openSideBar: true,
  setOpenSideBar: () => {},
};

export const SideBarContext = createContext<SideBarState>(initialState);

export const SideBarProvider = ({ children }: SideBarContextProviderProps) => {
  const [openSideBar, setOpenSideBar] = useState(true);
  return (
    <SideBarContext.Provider value={{ openSideBar, setOpenSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
};
