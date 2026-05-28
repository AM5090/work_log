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
import { useCreateWork } from "../../hooks/api/useCreateWork";
import { useUpdateWork } from "../../hooks/api/useUpdateWork";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const Table = () => {
  const [sorted, setSorted] = useState<"ASC" | "DESC" | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState<ModalNamesKeys | undefined>(
    undefined,
  );

  const { data, isLoading } = useGetAllWorks(sorted);
  const create = useCreateWork();
  const update = useUpdateWork();

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
        {modalName === "create" && (
          <WorkMutateForm
            onSubmitFunc={async (fields) => {
              await create.mutateAsync(fields);
              setIsModalOpen(false);
            }}
          />
        )}
        {modalName === "change" && (
          <WorkMutateForm
            onSubmitFunc={async (fields) => {
              await update.mutateAsync({
                updateId: selectedRowKeys[0] as unknown as string,
                body: fields,
              });
              setIsModalOpen(false);
            }}
          />
        )}
        {modalName === "delete" && (
          <DeleteComponent
            closeModal={() => setIsModalOpen(false)}
            selectedRowKeys={selectedRowKeys as unknown as (string | number)[]}
          />
        )}
      </Modal>
    </div>
  );
};

export default Table;
