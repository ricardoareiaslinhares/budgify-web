import { useQuery } from "@tanstack/react-query";
import { getRecord } from "../methods";

export const useRecord = <T>(

  entity: string,
  id: number,
  params?: string,
) => {
  const data = useQuery({
    queryKey: [`${entity}, ${id}`],
    queryFn: () => getRecord<T>(entity, id, params),
  });
  return data;
};
