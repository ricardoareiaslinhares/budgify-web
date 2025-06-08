"use client";
import { useContextRecords } from "@/context/RecordsContext";
import { DataGridColumnMapType, DataGridOptions } from "@/types/dataGrid";
import { GridValidRowModel, DataGrid as MUIDataGrid } from "@mui/x-data-grid";
import { generateColumns } from "./helpers";
import { useContext, useEffect, useState } from "react";
import { AppDialogContext } from "@/context/AppDialogContext";
import { useUpdateRecord } from "@/api-connection/record-hooks/useUpdateRecord";
import { useDeleteRecord } from "@/api-connection/record-hooks/useDeleteRecord";
import { API_ROUTES } from "@/constants";

type DataGridProps = {
  dataGridColumnMap: DataGridColumnMapType;
  options?: DataGridOptions;
};

export const DataGrid = <T,>({ dataGridColumnMap, options }: DataGridProps) => {
  const { data, entity, page, pageSize, setPage, setPageSize } =
    useContextRecords<T & GridValidRowModel>();
    
  const appDialog = useContext(AppDialogContext);
  const updateRecord = useUpdateRecord(entity, "",{queryInvalidatePrefix:entity});
    const deleteRecord = useDeleteRecord(entity, "",{queryInvalidatePrefix:entity});

  const deleteFn = (idUser: string | number) => {
    appDialog?.setContent({
      description:
        "Tem a certeza que pretende desativar este utilizador?",
      title: "Desativar utilizador",
    });


    appDialog?.setAction(() => () => {
      deleteRecord.mutate({id: idUser });
    });
    appDialog?.toggleOpen();
  };

    const activateFn = (idUser: string | number) => {
    appDialog?.setContent({
      description:
        "Tem a certeza que pretende ativar este utilizador?",
      title: "Ativar utilizador",
    });


    appDialog?.setAction(() => () => {
      updateRecord.mutate({ data:{isActive:true}, id: idUser });
    });
    appDialog?.toggleOpen();
  };

  const columnsDynamic = data.length > 0 ? generateColumns(data[0], dataGridColumnMap, deleteFn,activateFn) : [];

  console.log("Mui Data Grid data =>", data); // Delete

const users = data.map(user => {
  const { idUser, ...rest } = user;
  return {
    ...rest,
    id: idUser,
  };
});

  return (
    <MUIDataGrid
      rows={users}
      columns={columnsDynamic}
     // onRowClick={({ row: { email } }) => handleNavigateDetails(id)}
      paginationMode="server"
      rowCount={-1}
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
        if (page > newPage) setPage(page - pageSize);
        if (page < newPage) setPage(page + pageSize);

        setPageSize(newPageSize);
      }}
      sx={{
        backgroundColor: "transparent", // main grid background
        "& .MuiDataGrid-cell:hover": {
          cursor: "pointer",
        },
        "& .MuiDataGrid-cell": {
          backgroundColor: "transparent",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "transparent",
        },
        "& .MuiDataGrid-row": {
          backgroundColor: "transparent",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "transparent",
        },
      }}
      {...options?.dataGridProps}
    />
  );
};
