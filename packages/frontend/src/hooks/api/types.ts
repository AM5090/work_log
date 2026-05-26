export interface WorksResponse {
  id: number;
  workType: string;
  volume: string;
  executor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkMutateFields {
  workType: string;
  volume: string;
  executor: string;
}
