"use client";
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { usersColumnMap } from "./dataGridSettings";
import { Records } from "@/components/records/Records";
import { API_ROUTES } from "@/constants";
import { User, UserCreate } from "@/types/entities";
import {
  Button,
} from "@mui/material";
import { useState } from "react";
import { CreateUserDialog } from "./CreateUserDialog";
import { useCreateRecord } from "@/api-connection/record-hooks/useCreateRecord";

export default function Users() {
  const createRecord  = useCreateRecord<UserCreate>(API_ROUTES.user, {queryInvalidatePrefix:API_ROUTES.users})
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <BodyWraper
        customHeaderRightSide={
          <Button onClick={toggleOpen} variant="contained">
            Create User
          </Button>
        }
      >
        <Records<User>
          recordConfig={{ entity: API_ROUTES.users }}
          dataGridColumnMap={usersColumnMap}
        ></Records>
      </BodyWraper>
      <CreateUserDialog open={open} toggle={toggleOpen} createRecordFn={createRecord}/>
    </>
  );
}
 