import React, { forwardRef, useImperativeHandle } from "react";
import { Button, Form, Input, Modal } from "antd";
import CheckoutStepHeader from "./checkout-header";
import { orgLogo, orgName } from "../../org";

export interface CheckoutPaymentHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutPaymentProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutPayment = forwardRef<
  CheckoutPaymentHandles,
  CheckoutPaymentProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutPaymentProps,
    ref: React.Ref<CheckoutPaymentHandles>
  ) => {
    const [paymentForm] = Form.useForm();

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        // Notify the parent component that the form is valid
        onFormValidation(true);

        // Return true to indicate that the form submission was successful
        return true;
      },
    }));

    const onFinish = (values: any) => {
      console.log("Payment form values:", values);
    };

    return (
      <>
        <CheckoutStepHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 7.75a2 2 0 012-2h10.5a2 2 0 012 2v8.5a2 2 0 01-2 2H6.75a2 2 0 01-2-2v-8.5zM5 10.25h14M7.75 14.25h2.5M15.75 14.25h.5"
              ></path>
            </svg>
          }
        />
        <div className="p-6 rounded-md bg-neutral-100">
          <img
            src={orgLogo}
            alt={orgName + " Logo"}
            className="-mt-0.5 block max-h-[3.25rem] sm:max-h-[3.5rem] rounded mx-auto mb-2"
            loading="lazy"
          />
          <div className="pb-4 text-center border-b mb-7 heading border-neutral-200">
            Set up a Direct Debit with CG Swim School
          </div>
          <Form
            form={paymentForm}
            name="paymentForm"
            layout="vertical"
            onFinish={(values) => onFinish(values)}
            className="space-y-6 text-left hide-validation-asterix"
          >
            <Form.Item
              label="Name on the account"
              name="nameOnAccount"
              rules={[
                {
                  required: true,
                  message: "Please input the names on the account!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "The input is not a valid email!" },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Sort code"
              name="sortCode"
              extra="Must be 6 digits long"
              rules={[
                { required: true, message: "Please input your sort code!" },
                { len: 6, message: "Must be 6 digits long" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Account number"
              name="accountNumber"
              extra="Must be between 6 and 8 digits long"
              rules={[
                {
                  required: true,
                  message: "Please input your account number!",
                },
                {
                  min: 6,
                  max: 8,
                  message: "Must be between 6 and 8 digits long",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Post code"
              name="postCode"
              rules={[
                { required: true, message: "Please input your post code!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item className="pt-2">
              <Button type="primary" block>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.75 11.75a1 1 0 011-1h10.5a1 1 0 011 1v5.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-5.5zM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.626 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157"
                  ></path>
                </svg>

                <span>Set up Direct Debit</span>
              </Button>
            </Form.Item>
            <div className="flex items-center justify-center text-center gap-x-1.5">
              <span className="text-sm text-neutral-500/75">Powered by</span>
              <img
                src="https://i.ibb.co/YRy0FTh/Go-Cardles.png"
                alt="GoCardless Logo"
                className="relative block h-[15px] -top-px"
              />
            </div>
          </Form>
        </div>
        <div className="px-6 py-8 rounded-md bg-neutral-100">
          <img
            src={orgLogo}
            alt={orgName + " Logo"}
            className="block max-h-[3.25rem] sm:max-h-[3.5rem] rounded mx-auto mb-2"
            loading="lazy"
          />
          <div className="mb-4 font-medium text-center border-neutral-200">
            Direct Debit successfully setup
          </div>
          <div className="flex items-center justify-center text-center gap-x-1.5">
            <span className="text-sm text-neutral-500/75">Powered by</span>
            <img
              src="https://i.ibb.co/YRy0FTh/Go-Cardles.png"
              alt="GoCardless Logo"
              className="relative block h-[15px] -top-px"
            />
          </div>
        </div>
      </>
    );
  }
);

export default CheckoutPayment;
