
"use client"
import { LineChart } from "@/components/charts/LineChart";
import { useContextRecords } from "@/context/RecordsContext";
import { User } from "@/types/entities";
import { getISOWeek, getYear, parseISO } from "date-fns";



export const UsersChart = () => {
      const { data: userData } = useContextRecords<User>();
      const orderedUsers = [...userData].reverse();
  console.log("userData =>", userData); // Delete


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
<>
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
      /></>
  );
};