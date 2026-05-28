import { Button, Form, Input, InputNumber } from "antd";
import type { WorkMutateFields } from "../../hooks/api/types";
import type { FC } from "react";

const { useForm } = Form;

interface WorkMutateFormProps {
  onSubmitFunc: (fields: WorkMutateFields) => void;
}

const WorkMutateForm: FC<WorkMutateFormProps> = (props) => {
  const { onSubmitFunc } = props;

  const [form] = useForm();
  return (
    <Form
      name={"workMutateForm"}
      form={form}
      layout="vertical"
      requiredMark="optional"
      onFinish={(fields: WorkMutateFields) => {
        onSubmitFunc(fields);
      }}
    >
      <Form.Item<WorkMutateFields>
        label="Тип работ"
        name={"workType"}
        rules={[{ required: true, message: "Укажите тип работ" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<WorkMutateFields>
        label="Объем работ"
        name={"volume"}
        rules={[{ required: true, message: "Укажите объем работ" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          type={"number"}
          controls={false}
        />
      </Form.Item>

      <Form.Item<WorkMutateFields>
        label="Исполнитель"
        name={"executor"}
        rules={[{ required: true, message: "Укажите исполнителя" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button block htmlType="submit" type="primary">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkMutateForm;
