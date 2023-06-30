import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Input, Modal, Space } from "antd";
import FormHeader from "../form-header";
import AddressModal, { AddressValues } from "../address-modal";
import classNames from "classnames";

export interface CreateAccountContactDetailsFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface CreateAccountContactDetailsFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CreateAccountContactDetailsForms = forwardRef<
  CreateAccountContactDetailsFormsHandles,
  CreateAccountContactDetailsFormsProps
>(
  (
    {
      onFormValidation,
      title,
      subtitle,
    }: CreateAccountContactDetailsFormsProps,
    ref: React.Ref<CreateAccountContactDetailsFormsHandles>
  ) => {
    const [contactDetailsForm] = Form.useForm();
    const [formModal, setFormModal] = useState(false);

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [modalAddressValues, setModalAddressValues] =
      useState<AddressValues>();
    const [isValidAddress, setIsValidAddress] = useState(true);

    const showFormModal = () => {
      setFormModal(true);
    };

    const formModalCancel = () => {
      setFormModal(false);
    };

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await contactDetailsForm.validateFields();
          // If validation is successful, submit the form
          contactDetailsForm.submit();
          // Notify the parent component that the form is valid
          onFormValidation(true);
          // Return true to indicate that the form submission was successful
          return true;
        } catch (error) {
          // Log the validation error
          console.log("Validation failed:", error);
          // Notify the parent component that the form is not valid
          onFormValidation(false);
          // Return false to indicate that the form submission failed
          return false;
        }
      },
    }));

    // This function is called when the form is submitted
    const onDetailsFinish = () => {
      console.log("TO DO");
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    const onSave = (values: any) => {
      contactDetailsForm.setFieldsValue({ ...values });
      setModalAddressValues(values);
      setIsAddressModalOpen(false);
    };

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M18.25 11c0 4-6.25 8.25-6.25 8.25S5.75 15 5.75 11c0-3.5 2.936-6.25 6.25-6.25S18.25 7.5 18.25 11z"
              ></path>
              <circle
                cx="12"
                cy="11"
                r="2.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={contactDetailsForm}
          name="contactDetailsForm"
          onFinish={onDetailsFinish}
          onFinishFailed={onDetailsFinishFailed}
          className="text-left hide-validation-asterix"
        >
          <Form.Item
            label="Mobile number"
            name="mobileNumber"
            rules={[
              {
                required: true,
                message: "Please enter a mobile number",
              },
            ]}
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item label="Address">
            <Form.Item
              name="addressLineOne"
              rules={[{ required: true, message: "" }]}
              hidden
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              name="addressLineTwo"
              rules={[{ required: false }]}
              hidden
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              name="townCity"
              rules={[{ required: true, message: "" }]}
              hidden
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              name="postcode"
              rules={[{ required: true, message: "" }]}
              hidden
            >
              <Input readOnly />
            </Form.Item>
            <Button
              block={true}
              onClick={() => {
                setIsAddressModalOpen(true);
              }}
              className={classNames({
                "border border-solid": true,
                "border-primary-500 text-primary-600 hover:text-primary-500 hover:underline":
                  !modalAddressValues && isValidAddress,
                "border-danger-500 text-danger-500 hover:text-danger-400 hover:underline":
                  !modalAddressValues && !isValidAddress,
                "border-neutral-300 justify-start hover:bg-white hover:border-primary-500":
                  modalAddressValues && isValidAddress,
              })}
            >
              {!modalAddressValues ? (
                "Add address"
              ) : (
                <div className="-ml-1 truncate">
                  <span>{modalAddressValues.addressLineOne}, </span>
                  {modalAddressValues.addressLineTwo && (
                    <span>{modalAddressValues.addressLineTwo}, </span>
                  )}
                  <span>{modalAddressValues.townCity}, </span>
                  <span>{modalAddressValues.postcode}</span>
                </div>
              )}
            </Button>
            {!modalAddressValues && !isValidAddress && (
              <div className="ant-form-item-explain-error">
                Please add an address
              </div>
            )}
            <AddressModal
              openModal={isAddressModalOpen}
              onModalSave={onSave}
              onModalCancel={() => {
                setIsAddressModalOpen(false);
              }}
            />
          </Form.Item>
        </Form>
        <Modal
          title="Terms and Conditions"
          open={formModal}
          onCancel={formModalCancel}
          footer={null}
        >
          SHOW FORM HERE
        </Modal>
      </>
    );
  }
);

export default CreateAccountContactDetailsForms;
