import { Button } from "antd";
import type { FC } from "react";
import { useDeleteWork } from "../../hooks/api/useDeleteWork";

interface DeleteComponentProps {
  selectedRowKeys: (string | number)[];
  closeModal: () => void;
}

const DeleteComponent: FC<DeleteComponentProps> = (props) => {
  const { selectedRowKeys, closeModal } = props;

  const deleteWork = useDeleteWork();

  return (
    <div>
      <p>Вы точно хотите удалить записи?</p>
      <p>{`Всего записей: ${selectedRowKeys.length}`}</p>
      <Button
        block
        color="danger"
        variant="filled"
        onClick={async () => {
          await deleteWork.mutateAsync({ deleteIds: selectedRowKeys });
          closeModal();
        }}
      >
        Удалить
      </Button>
    </div>
  );
};

export default DeleteComponent;
