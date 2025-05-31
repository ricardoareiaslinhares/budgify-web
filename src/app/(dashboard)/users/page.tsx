"use client";
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { DataGrid } from "@/components/data-grid/DataGrid";
import { usersColumnMap } from "./dataGridSettings";
import { Records } from "@/components/records/Records";

export default function Users() {
  return (
    <BodyWraper>
      
      <Records<User>
        recordConfig={{ entity: "/users"}}
        dataGridColumnMap={usersColumnMap}
      ></Records>
    </BodyWraper>
  );
}
