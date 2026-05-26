import type { WorksResponse } from "../hooks/api/types";
import api from "./instance";

export const worksApi = {
  getAll: async (
    sortedBy?: "ASC" | "DESC",
  ): Promise<{ data: WorksResponse[] }> =>
    await api.get(sortedBy ? `/journal?sortedBy=${sortedBy}` : "/journal"),
};
