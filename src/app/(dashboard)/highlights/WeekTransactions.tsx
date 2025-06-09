"use client";
import { LineChart } from "@/components/charts/LineChart";
import { useContextRecords } from "@/context/RecordsContext";
import { TransactionStat } from "@/types/entities";
import { Box } from "@mui/material";

type WeekTransactionsProps = {};

export const WeekTransactions = ({}: WeekTransactionsProps) => {
  const { data } = useContextRecords<TransactionStat>();
  const chartTransactions = data.map((item) => ({
    x: new Date(item.date).toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
    }),

    y: item.count,
  }));
  return (
    <Box minHeight={"300px"}>
      <LineChart
        data={chartTransactions}
        title="Number Trasactions of last 7 days"
        xAxisLabel="Date"
        yAxisLabel="Number Transactions"
        height={500}
      />
    </Box>
  );
};
