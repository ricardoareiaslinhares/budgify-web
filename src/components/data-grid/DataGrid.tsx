"use client";
import { useContextRecords } from "@/context/RecordsContext";
import { DataGridColumnMapType, DataGridOptions } from "@/types/dataGrid";
import { GridValidRowModel, DataGrid as MUIDataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { generateColumns } from "./helpers";
import { useContext, useEffect, useState } from "react";
import { AppDialogContext } from "@/context/AppDialogContext";
import { useUpdateRecord } from "@/api-connection/record-hooks/useUpdateRecord";

type DataGridProps = {
  dataGridColumnMap: DataGridColumnMapType;
  options?: DataGridOptions;
};

export const DataGrid = <T,>({ dataGridColumnMap, options }: DataGridProps) => {
  const router = useRouter();
  const { data, entity, page, pageSize, setPage, setPageSize } =
    useContextRecords<T & GridValidRowModel>();
  const appDialog = useContext(AppDialogContext);
  const updateRecord = useUpdateRecord(entity, "",{queryInvalidatePrefix:entity});

  const handleFn = (id: number | string) => {
    appDialog?.setContent({
      description:
        "Tem a certeza que pretende apagar este utilizador? Esta ação é irreversível",
      title: "Apagar utilizador",
    });


    appDialog?.setAction(() => () => {
      console.log("id =>", id); // Delete
      updateRecord.mutate({ data:{is_active:false}, id: id });
    });
    appDialog?.toggleOpen();
  };

  const columnsDynamic =
    data.length > 0
      ? generateColumns(data[0], dataGridColumnMap, handleFn)
      : [];

  const handleNavigateDetails = (id: number) => {
    console.log(
      "handleNavigateDetails->",
      `${options?.extraOptions?.navigateDetails}${id}`
    );
    /*    router.push(`${options?.extraOptions?.navigateDetails}${id}`); */
  };

  return (
    <MUIDataGrid
      rows={data}
      columns={columnsDynamic}
      onRowClick={({ row: { id } }) => handleNavigateDetails(id)}
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
