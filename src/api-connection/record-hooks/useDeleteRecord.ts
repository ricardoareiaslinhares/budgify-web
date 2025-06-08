import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecord } from "../methods";
import { MutationOptions } from "@/types/types";

type DeleteArgs = {
  id: number | string;
};

export const useDeleteRecord = <T>(entity: string, params = "", options?: MutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation<T, void, DeleteArgs>({
    mutationFn: ({ id }: DeleteArgs) => deleteRecord<T>(entity, id, params),
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
      console.log("Delete error =>", error);
      return error;
    },
  });
};


