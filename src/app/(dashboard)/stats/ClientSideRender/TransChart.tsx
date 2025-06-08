
"use client"
import { LineChart } from "@/components/charts/LineChart";
import { useContextRecords } from "@/context/RecordsContext";
import { TransactionStat } from "@/types/entities";

export const TransChart = () => {
    const { data:transactionsData } = useContextRecords<TransactionStat>();
      const chartTransactions = transactionsData.map((item) => ({
    x: new Date(item.date).toLocaleDateString("pt-PT"),
    y: item.count,
  }));
  return (
      <LineChart
        data={chartTransactions}
        title="Number Transactions per day"
        xAxisLabel="Date"
        yAxisLabel="Number Transactions"
        height={500}
      />
  );
};