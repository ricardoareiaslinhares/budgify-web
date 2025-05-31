import { getRecords } from "@/api-connection/methods";
import { BodyWraper } from "@/components/body-wraper/BodyWraper";
import { LineChart } from "@/components/charts/LineChart";
import { Transaction, User } from "@/types/entities";

export default async function Stats() {
  const transactionsData = await getRecords<Transaction>("/transactions")
 // const userData = await getRecords<User>("/users") 

  console.log("transactionsData =>", transactionsData); // Delete

const amoutDate = transactionsData.map(item  => ({
  x: item.date,
  y:item.amount
}))

const amoutPlanned = transactionsData.map(item => ({
  x:item.is_planned  ? 1: 0,
  y:item.amount
}))



  return (
<BodyWraper>

            <LineChart
          data={amoutDate}
          title="Amount moved per Date"
          xAxisLabel="Date"
          yAxisLabel="Amount"
          height={500}
        />

            <LineChart
          data={amoutDate}
          title="Amount moved per Date"
          xAxisLabel="Date"
          yAxisLabel="Amount"
          height={500}
        />
</BodyWraper>
  );
}
