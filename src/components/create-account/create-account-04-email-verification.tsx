import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Form, Input, InputRef, Space } from "antd";
import FormHeader from "../form-header";
import { Link } from "react-router-dom";

export interface EmailVerificationFormsHandles {
  submitForm: () => Promise<boolean>;
}

interface EmailVerificationFormsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const EmailVerificationForms = forwardRef<
  EmailVerificationFormsHandles,
  EmailVerificationFormsProps
>(
  (
    { onFormValidation, title, subtitle }: EmailVerificationFormsProps,
    ref: React.Ref<EmailVerificationFormsHandles>
  ) => {
    const [EmailVerificationForm] = Form.useForm();

    const pin1Ref = useRef<InputRef>(null);
    const pin2Ref = useRef<InputRef>(null);
    const pin3Ref = useRef<InputRef>(null);
    const pin4Ref = useRef<InputRef>(null);

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await EmailVerificationForm.validateFields();
          // If validation is successful, submit the form
          EmailVerificationForm.submit();
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
                d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5.5 6.5l6.5 5.75 6.5-5.75"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={EmailVerificationForm}
          name="EmailVerificationForm"
          onFinish={onDetailsFinish}
          onFinishFailed={onDetailsFinishFailed}
          className="text-left hide-validation-asterix"
        >
          <Form.Item label="Verification PIN">
            <Space.Compact className="-space-x-px [&_.ant-form-item-label]:sr-only !w-full">
              <Form.Item
                label="Pin number 1"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  ref={pin1Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="text-center"
                  onChange={(e) => {
                    if (e.target.value && pin2Ref.current) {
                      pin2Ref.current.focus();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Pin number 2"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  ref={pin2Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="text-center"
                  onChange={(e) => {
                    if (e.target.value && pin3Ref.current) {
                      pin3Ref.current.focus();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Pin number 3"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  ref={pin3Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="text-center"
                  onChange={(e) => {
                    if (e.target.value && pin4Ref.current) {
                      pin4Ref.current.focus();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Pin number 4"
                rules={[{ required: true, message: "" }]}
                className="!mb-0 !w-full"
              >
                <Input
                  ref={pin4Ref}
                  size="large"
                  inputMode="numeric"
                  maxLength={1}
                  className="text-center"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <div className="sub-heading-sm">
            Didn't receive the email? Check your spam folder or{" "}
            <Link to="#" className="link">
              click to resend.
            </Link>
          </div>
        </Form>
      </>
    );
  }
);

export default EmailVerificationForms;
