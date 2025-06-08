import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecord } from "../methods";

type MutationArgs<T> = {
  data: T;
};

type MutationOptions = {
  queryInvalidatePrefix?: string;
  invalidateListQuery?: boolean;
};

export const useCreateRecord = <T>(
  entity: string,
  options?: MutationOptions
) => {
  const queryClient = useQueryClient();

  return useMutation<T, void, MutationArgs<T>>({
    mutationFn: ({ data }: MutationArgs<T>) => createRecord<T>(entity, data),

    onSuccess(data) {
      const recordsKey = options?.queryInvalidatePrefix || `${entity}-records`;
       const recordKey = `${entity}-${(data as any)?.id}`; // TODO verify if ok

      const invalidationKeys = [recordsKey, recordKey];

      invalidationKeys.forEach((key) => {
        queryClient.invalidateQueries({
          predicate(query: any) {
            return query.queryKey[0].includes(key);
          },
        });
      });
    },
    onError(error) {
        console.log("error =>", error); // Delete
        
      return error
    },
  });
};

