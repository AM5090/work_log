import type { ColumnsType } from "antd/es/table";
import type { WorksResponse } from "../../hooks/api/types";

export const columns: ColumnsType<WorksResponse> = [
  {
    title: "Дата выполнения",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    render: (createdAt) => {
      const date = new Date(createdAt);
      return <span>{date.toLocaleDateString("ru-RU")}</span>;
    },
  },
  {
    title: "Последнее изменение",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    render: (updatedAt) => {
      const date = new Date(updatedAt);
      return <span>{date.toLocaleDateString("ru-RU")}</span>;
    },
  },
  {
    title: "Виды работ",
    dataIndex: "workType",
    key: "workType",
    align: "center",
  },
  {
    title: "Объем работ",
    dataIndex: "volume",
    key: "volume",
    align: "center",
  },
  {
    title: "Исполнитель",
    dataIndex: "executor",
    key: "executor",
    align: "center",
  },
];
