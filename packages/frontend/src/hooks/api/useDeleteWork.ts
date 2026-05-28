import { useMutation, useQueryClient } from "@tanstack/react-query";
import { worksApi } from "../../api/authApi";
import type { AxiosError } from "axios";

export function useDeleteWork() {
  const queryClient = useQueryClient();

  return useMutation<
    string,
    AxiosError<unknown>,
    { deleteIds: (string | number)[] }
  >({
    mutationFn: ({ deleteIds }) =>
      worksApi.delete(deleteIds).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
  });
}
