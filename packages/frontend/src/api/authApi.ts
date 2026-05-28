import type { WorkMutateFields, WorksResponse } from "../hooks/api/types";
import api from "./instance";

export const worksApi = {
  getAll: async (
    sortedBy?: "ASC" | "DESC",
  ): Promise<{ data: WorksResponse[] }> =>
    await api.get(sortedBy ? `/journal?sortedBy=${sortedBy}` : "/journal"),
  create: async (body: WorkMutateFields): Promise<{ data: WorksResponse }> =>
    await api.post("/journal", body),
  update: async (
    updateId: string,
    body: WorkMutateFields,
  ): Promise<{ data: WorksResponse }> =>
    await api.put(`/journal?id=${updateId}`, body),
  delete: async (ids: (string | number)[]): Promise<{ data: string }> =>
    await api.delete(`/journal?id=${ids.join()}`),
};
