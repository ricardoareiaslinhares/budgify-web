import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { LineChart } from "@/components/charts/LineChart";
import { API_ROUTES, API_URL } from "@/constants";
import { TransactionStat, User } from "@/types/entities";
import { getISOWeek, getYear, parseISO } from "date-fns";


export const dynamic = "force-dynamic";

export default async function Stats() {
  const today = new Date().toISOString();



const productionURL = "https://budgify-web.vercel.app"

  const params = `startDate=2023-12-06T23:56:08.606Z&endDate=${today}`;

  
const response = await fetch(
  `${API_ROUTES.transactions.api}?${params}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }
);

if (!response.ok) {
  const text = await response.text(); // Helpful for debugging
  console.error("Transaction API failed:", text);
  throw new Error("Failed to fetch transactions");
}

const data = await response.json();


  console.log("data Stats=>", data); // Delete

  const transactionsData: Array<TransactionStat> = data.data;

const responseUser = await fetch(`${API_ROUTES.users.api}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  cache: "no-store",
});

if (!responseUser.ok) {
  const text = await responseUser.text();
  console.error("User API failed:", text);
  throw new Error("Failed to fetch users");
}

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
