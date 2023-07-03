import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import FormHeader from "../form-header";
import { Link } from "react-router-dom";

export interface CreateAccountPasswordFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface CreateAccountPasswordFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CreateAccountPasswordForms = forwardRef<
  CreateAccountPasswordFormsHandles,
  CreateAccountPasswordFormsProps
>(
  (
    { onFormValidation, title, subtitle }: CreateAccountPasswordFormsProps,
    ref: React.Ref<CreateAccountPasswordFormsHandles>
  ) => {
    const [setPasswordForm] = Form.useForm();

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await setPasswordForm.validateFields();
          // If validation is successful, submit the form
          setPasswordForm.submit();
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
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.75 11.75a1 1 0 011-1h10.5a1 1 0 011 1v5.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-5.5zM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.626 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={setPasswordForm}
          name="setPasswordForm"
          onFinish={onDetailsFinish}
          onFinishFailed={onDetailsFinishFailed}
          className="text-left hide-validation-asterix"
        >
          <Form.Item
            label="Set password"
            name="setPassword"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="sub-heading-sm">
            By clicking Create account you confirm that you agree to our{" "}
            <Link to="#" className="link">
              Terms & Conditions.
            </Link>
          </div>
        </Form>
      </>
    );
  }
);

export default CreateAccountPasswordForms;
