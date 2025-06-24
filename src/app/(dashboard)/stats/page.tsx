// Bellow is the SSR version that runs on production

/* 
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { LineChart } from "@/components/charts/LineChart";
import { API_ROUTES, API_URL } from "@/constants";
import { TransactionStat, User } from "@/types/entities";
import { cookies } from "next/headers";
import { getISOWeek, getYear, parseISO } from "date-fns";
import { ErrorFetch } from "@/components/ErrorFetch";

export default async function Stats() {
  const today = new Date().toISOString();
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  const statsParams = `startDate=2023-12-06T23:56:08.606Z&endDate=${today}`;

  const [response, responseUser] = await Promise.all([
    fetch(`${API_URL}${API_ROUTES.transactions.be}?${statsParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }),
    fetch(`${API_URL}${API_ROUTES.users.be}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }),
  ]);

  if (!response.ok || !responseUser.ok) return <ErrorFetch />;

  const data = await response.json();
  const dataUser = await responseUser.json();

  // Trans Charts
  const transactionsData: Array<TransactionStat> = data.data;

  const chartTransactions = transactionsData.map((item) => ({
    x: new Date(item.date).toLocaleDateString("pt-PT"),
    y: item.count,
  }));

  // User Charts
  const userData: Array<User> = dataUser.data;
  const orderedUsers = [...userData].reverse();

  const usersPerDay = orderedUsers.reduce((acc, user) => {
    const date = user.creationDate;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartUserPerDay = Object.entries(usersPerDay).map(([date, count]) => ({
    x: new Date(date).toLocaleDateString("pt-PT"),
    y: count,
  }));

  const usersPerWeek = orderedUsers.reduce((acc, user) => {
    const date = parseISO(user.creationDate);
    const week = getISOWeek(date);
    const year = getYear(date);
    const key = `${year}-Week-${week.toString().padStart(2, "0")}`;

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartUserPerWeek = Object.entries(usersPerWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, count]) => ({
      x: week,
      y: count,
    }));


  return (
    <BodyWraper>
      <LineChart
        data={chartTransactions}
        title="Number Transactions per day"
        xAxisLabel="Date"
        yAxisLabel="Number Transactions"
        height={500}
      />
      <LineChart
        data={chartUserPerDay}
        title="New Users per day"
        xAxisLabel="Date"
        yAxisLabel="Number Users"
        height={500}
      />
      <LineChart
        data={chartUserPerWeek}
        title="New Users per week"
        xAxisLabel="Date"
        yAxisLabel="Number Users"
        height={500}
      />
    </BodyWraper>
  );
}
 */
// No ssr version:

"use client";
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { API_ROUTES, API_URL } from "@/constants";
import { TransactionStat, User } from "@/types/entities";
import { Records } from "@/components/records/Records";
import { TransChart } from "./ClientSideRender/TransChart";
import { UsersChart } from "./ClientSideRender/UsersChart";

export default function Stats() {
  const today = new Date().toISOString();

  const statsParams = `startDate=2023-12-06T23:56:08.606Z&endDate=${today}`;

  return (
    <BodyWraper sx={{minHeight:"400px"}}>
      <Records<TransactionStat>
        recordConfig={{ entity: API_ROUTES.transactions.api, params: statsParams }}
        customRender={<TransChart />}
      />
      <Records<User>
        recordConfig={{ entity: API_ROUTES.users.api, params: "" }}
        customRender={<UsersChart />}
      />
    </BodyWraper>
  );
}
 
