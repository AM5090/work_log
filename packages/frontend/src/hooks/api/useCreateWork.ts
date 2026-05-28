import { useMutation, useQueryClient } from "@tanstack/react-query";
import { worksApi } from "../../api/authApi";
import type { AxiosError } from "axios";
import type { WorkMutateFields, WorksResponse } from "./types";

export function useCreateWork() {
  const queryClient = useQueryClient();

  return useMutation<WorksResponse, AxiosError<unknown>, WorkMutateFields>({
    mutationFn: (body) => worksApi.create(body).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
    },
  });
}
