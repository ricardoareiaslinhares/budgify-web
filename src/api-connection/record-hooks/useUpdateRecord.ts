import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecord } from "../methods";

type MutationArgs<T> = {
    data: Partial<T>
    id: number | string,

}

export const useUpdateRecord =<T> (entity:string, params="", options?: MutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation<T, void, MutationArgs<T>>({
    mutationFn: ({ data, id }: MutationArgs<T>) => updateRecord(entity, id, data, params),
    onSuccess(data, variables) {
      const recordsKey = options?.queryInvalidatePrefix || `${entity}-records`;
      const recordKey = `${entity}-${(data as any)?.id || variables.id}`;

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

type MutationOptions = {
    queryInvalidatePrefix?: string;
    invalidateListQuery?: boolean;
    invalidateItemQuery?: boolean;
};
