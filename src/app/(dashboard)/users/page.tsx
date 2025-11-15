"use client";
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { usersColumnMap, usersOptions } from "./usersDataGridSettings";
import { Records } from "@/components/records/Records";
import { API_ROUTES } from "@/constants";
import { User, UserCreate } from "@/types/entities";
import { Button } from "@mui/material";
import { useState } from "react";
import { CreateUserDialog } from "./CreateUserDialog";
import { useCreateRecord } from "@/api-connection/record-hooks/useCreateRecord";

export default function Users() {
  const createRecord = useCreateRecord<UserCreate>(API_ROUTES.user.api, {
    queryInvalidatePrefix: API_ROUTES.users.api,
  });
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <BodyWraper
        sx={{ minHeight: "200px" }}
        customHeaderRightSide={
          <Button data-testid="create-user-button" onClick={toggleOpen} variant="contained">
            Create User
          </Button>
        }
      >
        <Records<User>
          recordConfig={{ entity: API_ROUTES.users.api }}
          dataGridColumnMap={usersColumnMap}
          dataGridOptions={usersOptions}
        />
      </BodyWraper>
      <CreateUserDialog open={open} toggle={toggleOpen} createRecordFn={createRecord} />
    </>
  );
}
