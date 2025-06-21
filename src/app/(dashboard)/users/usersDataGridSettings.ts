import { GENRES } from "@/constants";
import { DataGridColumnMapType, DataGridOptionsType } from "@/types/dataGrid";

export const usersColumnMap: DataGridColumnMapType = {
/*   idUser: {
    hidden: true,
  },
  idUserGroup: {
    hidden: true,
  }, */
  profilePic: {
    hidden: true,
  },
  genre: {
    headerName: "Genre",
    field: "genre",
    hidden: true,
    valueGetter: (value) => {
      return GENRES.find((genre) => genre.value === value)?.label ?? value;
    },
  },
};

export const usersOptions: DataGridOptionsType = {
  dataGridProps: {},
  extraOptions: {
    updateAction: {
      title: "Activate User",
      description: "Are you sure you want to activate this user?",
      payload: { isActive: true },
    },
    deleteAction: {
      title: "Deactivate User",
      description: "Are you sure you want to deactivate this user?",
    },
  },
};
