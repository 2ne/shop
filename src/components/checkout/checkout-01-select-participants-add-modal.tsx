import React from "react";
import { Form, Input, Modal, Space } from "antd";

export interface AddParticipantValues {
  firstName: string;
  lastName: string;
  dobDD: number;
  dobMM: number;
  dobYYYY: number;
}

interface AddParticipantModalProps {
  openModal: boolean;
  onModalSave: (values: AddParticipantValues) => void;
  onModalCancel: () => void;
}

const AddParticipantModal: React.FC<AddParticipantModalProps> = ({
  openModal: isModalOpen,
  onModalSave: onSave,
  onModalCancel: onCancel,
}) => {
  const [AddParticipantForm] = Form.useForm();
  return (
    <Modal
      width={364}
      maskClosable={false}
      open={isModalOpen}
      title="Add Participant"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        AddParticipantForm.validateFields()
          .then((values) => {
            onSave(values as AddParticipantValues);
            AddParticipantForm.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={AddParticipantForm}
        layout="vertical"
        name="AddParticipantForm"
        className="hide-validation-asterix"
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, message: "Please enter a last name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Date of birth" extra="Example · 31/04/1970">
          <Space.Compact className="-space-x-px [&_.ant-form-item-label]:sr-only">
            <Form.Item
              name="dobDD"
              label="Day"
              rules={[{ required: true, message: "" }]}
              className="!mb-0"
            >
              <Input inputMode="numeric" maxLength={2} placeholder="DD" />
            </Form.Item>
            <Form.Item
              name="dobMM"
              label="Month"
              rules={[{ required: true, message: "" }]}
              className="!mb-0"
            >
              <Input inputMode="numeric" maxLength={2} placeholder="MM" />
            </Form.Item>
            <Form.Item
              name="dobYYYY"
              label="Year"
              rules={[{ required: true, message: "" }]}
              className="!mb-0"
            >
              <Input inputMode="numeric" maxLength={4} placeholder="YYYY" />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddParticipantModal;
