import { DataGridColumnMapType } from "@/types/dataGrid";
import { Delete, Restore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { GridActionsCellItem, GridActionsColDef, GridColDef } from "@mui/x-data-grid";

/* 
  Fn gets the data to use the keys and match them in a custom mapper
  if the key is in the mapper users the mapper properties
  if not, uses default but with a presentable headerName
*/

export const generateColumns = <T extends Record<string, unknown>>(
  data: T,
  mapper: DataGridColumnMapType,
  deleteFn: (idUser: number | string) => void,
    updateFn: (idUser: number | string) => void
): GridColDef[] => {
  const keys = Object.keys(data) as (keyof T)[];
  console.log("keys =>", keys); // Delete
  

  const dataColumns = keys
    .filter((key) => key !=="idUser" && key !== "idUserGroup")
    .map((key) => {
      const mapperEntry = mapper[String(key)];
      console.log("mapperEntry =>", mapperEntry); // Delete
      

      if (!mapperEntry) {
        return {
          field: String(key),
          headerName: presentableDBkey(String(key)),
        };
      }

      return {
        field: mapperEntry.field!,
        ...mapperEntry,
      };
    });

 const actionsColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <>

        <IconButton onClick={() => deleteFn(params.row.id)}>
          <Delete color="warning" />
        </IconButton>
                <IconButton onClick={() => updateFn(params.row.id)}>
          <Restore color="primary" />
        </IconButton>
      </>
    ),
  };

  return [...dataColumns, actionsColumn];
};
const presentableDBkey = (s: string) => {
  return s
    .replace(/_/g, " ") // Replace underscores with spaces first
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (char) => char.toUpperCase()) // Capitalize first letter
    .trim(); // Remove any leading/trailing spaces
};
