
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { API_ROUTES } from "@/constants";
import { User } from "@/types/entities";
import { Records } from "@/components/records/Records";
import { NewUserCards } from "./NewUserCards";
import {endOfDay, subDays } from 'date-fns';
import { WeekTransactions } from "./WeekTransactions";

export default function Home() {
  const today = new Date()
const sevenDaysAgo = subDays(today, 6);
const startDate = sevenDaysAgo.toISOString();
const endDate = endOfDay(today).toISOString();
const params = `startDate=${startDate}&endDate=${endDate}`;


  

  return (
    <BodyWraper sx={{minHeight:"300px"}}>
      <Records<User>
        recordConfig={{ entity: API_ROUTES.transactions.api, params:params }}
        customRender={
          <WeekTransactions/>
        }
      />
      <Records<User>
        recordConfig={{ entity: API_ROUTES.users.api }}
        customRender={
          <NewUserCards/>
        }
      />
    </BodyWraper>
  );
}
