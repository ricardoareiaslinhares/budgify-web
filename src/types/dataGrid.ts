import {
  GridColDef,
  DataGridProps as MUIDataGridProps,
} from "@mui/x-data-grid";

type GridColDefExtraSettingsType = {
  hidden: boolean;
};
export type DataGridColumnMapType = {
  [key: string]: Partial<GridColDef> & Partial<GridColDefExtraSettingsType>;
};

export type DataGridOptionsType = {
  dataGridProps: Partial<
    Omit<MUIDataGridProps, "columns" | "rows" | "onRowClick">
  >;
  extraOptions: {
    navigateDetails?: string;
    updateAction?: {
      title: string;
      description: string;
      payload: Record<string, any>;
    };
    deleteAction?: {
      title: string;
      description: string;
    };
  };
};
