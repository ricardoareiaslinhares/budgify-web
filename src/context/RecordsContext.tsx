import React, { createContext } from "react";

type RecordsContextType<T> = {
  data: T[];
  entity: string,
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};

export const RecordsContext = createContext<
  RecordsContextType<any> | undefined
>(undefined);

export function useContextRecords<T>(): RecordsContextType<T> {
  const context = React.useContext(RecordsContext);
  if (context === undefined) {
    throw new Error(
      "useContextRecords must be used within a RecordsContext.Provider"
    );
  }
  return context as RecordsContextType<T>;
}
