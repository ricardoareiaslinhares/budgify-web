"use client"
import { useRecords } from "@/api-connection/record-hooks/useRecords";
import { Loading } from "../Loading";
import { ErrorFetch } from "../ErrorFetch";
import { RecordsContext } from "@/context/RecordsContext";
import { DataGrid } from "../data-grid/DataGrid";
import { DataGridColumnMapType, DataGridOptions } from "@/types/dataGrid";
import { useState } from "react";

type RecordsProps = {
  recordConfig: { entity: string, params?: string };
  dataGridColumnMap: DataGridColumnMapType;
  dataGridOptions?: DataGridOptions;
  customRender?: React.ReactNode;
};

export const Records = <T,>({
  recordConfig,
  customRender,
  dataGridColumnMap,
  dataGridOptions,
}: RecordsProps) => {
  const { entity, params = "" } = recordConfig;
    const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const completeParams = `${params}&_start=${page}&_limit=${pageSize}`
  console.log("page, pageSize =>", page, pageSize); // Delete
  

  const { data, error, isLoading } = useRecords(entity, completeParams);

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorFetch />;


  return (
    <RecordsContext.Provider value={{ data, entity, page, setPage, pageSize, setPageSize }}>
      {customRender || (
        <DataGrid<T>
          dataGridColumnMap={dataGridColumnMap}
          options={dataGridOptions}
        />
      )}
    </RecordsContext.Provider>
  );
};
