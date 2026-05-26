import { useQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { worksApi } from "../../api/authApi";

export function useGetAllWorks(sortedBy?: "ASC" | "DESC") {
  return useQuery({
    queryKey: sortedBy ? ["works", sortedBy] : ["works"],
    queryFn: async ({ queryKey }: QueryFunctionContext<string[]>) => {
      const [, sort] = queryKey;
      const res = await worksApi.getAll(sort as "ASC" | "DESC" | undefined);
      return res.data;
    },
  });
}
