import {
  Button,
  Flex,
  Modal,
  Space,
  Table as TableUI,
  type TableProps,
} from "antd";
import { useGetAllWorks } from "../../hooks/api/useGetAllWorks";
import { useEffect, useState } from "react";
import type { WorksResponse } from "../../hooks/api/types";
import { columns } from "./settings";
import { WorkMutateForm } from "../workMutateForm";
import { modalNames, type ModalNamesKeys } from "./constants";
import { DeleteComponent } from "../deleteComponent";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Table = () => {
  const [sorted, setSorted] = useState<"ASC" | "DESC" | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState<ModalNamesKeys | undefined>(
    undefined,
  );

  const { data, isLoading } = useGetAllWorks(sorted);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<WorksResponse> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    console.log("selectedRowKeys: ", selectedRowKeys);
  }, [selectedRowKeys]);

  return (
    <div>
      <Flex justify={"space-between"}>
        <Button
          color="primary"
          variant="filled"
          onClick={() =>
            setSorted((pre) =>
              pre === "ASC" || pre === undefined ? "DESC" : "ASC",
            )
          }
        >
          {` Отсортировать по ${sorted === "ASC" || sorted === undefined ? "убыванию" : "возрастанию"} даты`}
        </Button>
        <Space>
          <Button
            color="primary"
            variant="filled"
            onClick={() => {
              setIsModalOpen(true);
              setModalName("create");
            }}
          >
            Создать
          </Button>
          <Button
            color="primary"
            variant="filled"
            disabled={!(selectedRowKeys.length === 1)}
            onClick={() => {
              setIsModalOpen(true);
              setModalName("change");
            }}
          >
            Изменить
          </Button>
          <Button
            color="danger"
            variant="filled"
            disabled={!(selectedRowKeys.length > 0)}
            onClick={() => {
              setIsModalOpen(true);
              setModalName("delete");
            }}
          >
            Удалить
          </Button>
        </Space>
      </Flex>
      <TableUI<WorksResponse>
        rowKey={"id"}
        loading={isLoading}
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={false}
      />

      <Modal
        title={modalName ? modalNames[modalName] : ""}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setModalName(undefined);
        }}
        footer={null}
      >
        {modalName === "create" && <WorkMutateForm />}
        {modalName === "change" && <WorkMutateForm />}
        {modalName === "delete" && (
          <DeleteComponent selectedRowKeys={selectedRowKeys.length} />
        )}
      </Modal>
    </div>
  );
};

export default Table;
