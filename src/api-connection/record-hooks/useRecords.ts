import { useQuery } from "@tanstack/react-query";
import { getRecords } from "../methods";

export const useRecords = <T>(

  entity: string,
  params?: string,
) => {  
  const data = useQuery({
    queryKey: [entity, params],
    queryFn: () => getRecords<T>(entity, params),
    staleTime: 1 * 60 * 1000, // 1 minute cache
  });
  return data;
};
