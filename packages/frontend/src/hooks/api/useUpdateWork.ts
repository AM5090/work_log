import { useMutation, useQueryClient } from "@tanstack/react-query";
import { worksApi } from "../../api/authApi";
import type { AxiosError } from "axios";
import type { WorkMutateFields, WorksResponse } from "./types";

export function useUpdateWork() {
  const queryClient = useQueryClient();

  return useMutation<
    WorksResponse,
    AxiosError<unknown>,
    { updateId: string; body: WorkMutateFields }
  >({
    mutationFn: ({ updateId, body }) =>
      worksApi.update(updateId, body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
  });
}
