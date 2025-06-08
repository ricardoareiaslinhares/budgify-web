import { getRecords } from "@/api-connection/methods";
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { LineChart } from "@/components/charts/LineChart";
import { API_ROUTES, API_URL } from "@/constants";
import { User } from "@/types/entities";
import { cookies } from "next/headers";
import { getISOWeek, getYear, parseISO } from "date-fns";

type TransactionStat = {
  count: number;
  date: Date;
};

export default async function Stats() {
  const today = new Date().toISOString();
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  const params = `startDate=2023-12-06T23:56:08.606Z&endDate=${today}`;
  const response = await fetch(
    `${API_URL}${API_ROUTES.transactions}?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  const data = await response.json();

  console.log("data Stats=>", data); // Delete

  const transactionsData: Array<TransactionStat> = data.data;

  const responseUser = await fetch(`${API_URL}${API_ROUTES.users}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const dataUser = await responseUser.json();
  const userData: Array<User> = dataUser.data;
  const orderedUsers = [...userData].reverse();
  console.log("userData =>", userData); // Delete

  const chartTransactions = transactionsData.map((item) => ({
    x: new Date(item.date).toLocaleDateString("pt-PT"),
    y: item.count,
  }));

  //-

  const usersPerDay = orderedUsers.reduce((acc, user) => {
    const date = user.creationDate;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartUserPerDay = Object.entries(usersPerDay).map(([date, count]) => ({
    x: new Date(date).toLocaleDateString("pt-PT"),
    y: count,
  }));
  //_
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
//_

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
