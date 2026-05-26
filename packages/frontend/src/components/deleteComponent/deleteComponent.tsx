import { Button } from "antd";
import type { FC } from "react";

interface DeleteComponentProps {
  selectedRowKeys: number;
}

const DeleteComponent: FC<DeleteComponentProps> = (props) => {
  const { selectedRowKeys } = props;

  return (
    <div>
      <p>Вы точно хотите удалить записи?</p>
      <p>{`Всего записей: ${selectedRowKeys}`}</p>
      <Button block color="danger" variant="filled">
        Удалить
      </Button>
    </div>
  );
};

export default DeleteComponent;
