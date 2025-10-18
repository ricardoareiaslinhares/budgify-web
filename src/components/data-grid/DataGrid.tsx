"use client";
import { useContextRecords } from "@/context/RecordsContext";
import { DataGridColumnMapType, DataGridOptionsType } from "@/types/dataGrid";
import { GridValidRowModel, DataGrid as MUIDataGrid } from "@mui/x-data-grid";
import { generateColumns } from "./helpers";
import { useContext } from "react";
import { AppDialogContext } from "@/context/AppDialogContext";
import { useUpdateRecord } from "@/api-connection/record-hooks/useUpdateRecord";
import { useDeleteRecord } from "@/api-connection/record-hooks/useDeleteRecord";

type DataGridProps = {
  dataGridColumnMap: DataGridColumnMapType;
  options?: DataGridOptionsType;
};

export const DataGrid = <T,>({ dataGridColumnMap, options }: DataGridProps) => {
  const { data, entity, page, pageSize, setPage, setPageSize } = useContextRecords<
    T & GridValidRowModel
  >();

  const appDialog = useContext(AppDialogContext);
  const updateRecord = useUpdateRecord(entity, "", {
    queryInvalidatePrefix: entity,
  });
  const deleteRecord = useDeleteRecord(entity, "", {
    queryInvalidatePrefix: entity,
  });

  const deleteFn = (id: string | number, isActive: boolean) => {
    const action = options?.extraOptions.deleteAction;
    if (!action) return;
    appDialog?.setContent({
      title: action.title,
      description: action.description,
    });
    const isAlreadyInThatState = isActive === false;

    appDialog?.setAction(() => () => {
      if (isAlreadyInThatState) {
        alert("The user is already deactivated");
      }
      deleteRecord.mutate({ id: id });
    });
    appDialog?.toggleOpen();
  };

  const activateFn = (id: string | number, isActive: boolean) => {
    const action = options?.extraOptions.updateAction;
    if (!action) return;
    appDialog?.setContent({
      title: action.title,
      description: action.description,
    });

    const isAlreadyInThatState = isActive === true;

    appDialog?.setAction(() => () => {
      console.log(isActive);
      if (isAlreadyInThatState) {
        alert("The user is already active");
      }
      updateRecord.mutate({ data: action.payload, id: id });
    });
    appDialog?.toggleOpen();
  };

  const columnsDynamic =
    data.length > 0 ? generateColumns(data[0], dataGridColumnMap, deleteFn, activateFn) : [];

  const users = data.map((user) => {
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
      paginationMode="server"
      rowCount={-1}
      paginationModel={{ page, pageSize }}
      pageSizeOptions={[5]}
      onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
        setPage(newPage);
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
