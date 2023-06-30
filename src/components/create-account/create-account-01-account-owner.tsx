import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Input, Space } from "antd";
import FormHeader from "../form-header";

export interface CreateAccountOwnerFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface CreateAccountOwnerFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CreateAccountOwnerForms = forwardRef<
  CreateAccountOwnerFormsHandles,
  CreateAccountOwnerFormsProps
>(
  (
    { onFormValidation, title, subtitle }: CreateAccountOwnerFormsProps,
    ref: React.Ref<CreateAccountOwnerFormsHandles>
  ) => {
    const [accountOwnerForm] = Form.useForm();

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await accountOwnerForm.validateFields();
          // If validation is successful, submit the form
          accountOwnerForm.submit();
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

    return (
      <>
        <FormHeader
          title={title}
          subtitle={subtitle}
          requiredText="Details for your child or dependent will be collected later"
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="8"
                r="3.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.848 19.25h10.305c1.141 0 2.021-.982 1.488-1.992C17.856 15.773 16.068 14 12 14s-5.856 1.773-6.64 3.258c-.534 1.01.346 1.992 1.487 1.992z"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={accountOwnerForm}
          name="accountOwnerForm"
          onFinish={onDetailsFinish}
          onFinishFailed={onDetailsFinishFailed}
          className="text-left hide-validation-asterix"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Email address is not valid",
              },
              {
                required: true,
                message: "Please enter your email address",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Date of birth" extra="Example · 30/04/1970">
            <Space.Compact className="-space-x-px [&_.ant-form-item-label]:sr-only !w-full">
              <Form.Item
                name="bday-day"
                label="Day"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input inputMode="numeric" maxLength={2} placeholder="DD" />
              </Form.Item>
              <Form.Item
                name="bday-month"
                label="Month"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input inputMode="numeric" maxLength={2} placeholder="MM" />
              </Form.Item>
              <Form.Item
                name="bday-year"
                label="Year"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input inputMode="numeric" maxLength={4} placeholder="YYYY" />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Form>
      </>
    );
  }
);

export default CreateAccountOwnerForms;
