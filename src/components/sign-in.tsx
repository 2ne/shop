import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import type { InputRef } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { orgLogo, orgName } from "../org";

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulLogin: () => void;
}

const SignInModal: React.FC<SignInProps> = ({
  isOpen,
  onClose,
  onSuccessfulLogin,
}) => {
  const [form] = Form.useForm();
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    if (isOpen && emailRef.current) {
      setTimeout(
        () =>
          emailRef.current?.focus({
            cursor: "start",
          }),
        100
      ); // timeout is needed because antd Modal animation causes issues with immediate focus
    }
  }, [isOpen]);

  useEffect(() => {
    if (userExists && passwordRef.current) {
      setTimeout(
        () =>
          passwordRef.current?.focus({
            cursor: "start",
          }),
        100
      );
    }
  }, [userExists]); // this effect runs when userExists changes

  const handleContinue = () => {
    if (email === "jamestoone@gmail.com") {
      setUserExists(true);
      setNewUser(false);
      if (password.length > 1) {
        onClose();
        onSuccessfulLogin();
      }
    } else {
      setNewUser(true);
      setUserExists(false);
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleContinue();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleEmailReset = () => {
    setUserExists(false);
    form.setFieldsValue({ email: "" });
    setTimeout(() => emailRef.current?.focus(), 100);
  };

  return (
    <Modal width={340} open={isOpen} onCancel={onClose} footer={null}>
      <div className="grid gap-6 px-1 pb-2">
        <div className="pt-8">
          <img
            src={orgLogo}
            alt={orgName + " Logo"}
            className="w-12 h-16 mx-auto"
            loading="lazy"
          />
        </div>
        <div className="text-center">
          <h2 className="mb-1 text-base font-medium">
            {!userExists ? "Sign in or create a new account" : "Welcome back"}
          </h2>
          <div className="text-base text-neutral-500">
            {!userExists
              ? "Enter your email to continue"
              : "Enter your password to continue"}
          </div>
        </div>
        <Form
          layout="vertical"
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="relative">
            <Form.Item
              className={userExists ? "!mb-4" : " "}
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
              <Input
                ref={emailRef}
                prefix={<UserOutlined className="w-5 text-neutral-600" />}
                placeholder="Email address"
                className="[&>input.ant-input:disabled]:!shadow-[0_0_0_20px_#f5f5f5_inset] [&>input.ant-input]:!shadow-[0_0_0_20px_white_inset] [&>input.ant-input:focus]:!shadow-[0_0_0_20px_white_inset]"
                onChange={(e) => setEmail(e.target.value)}
                disabled={userExists}
              />
            </Form.Item>
            {userExists && (
              <Button
                onClick={handleEmailReset}
                size="small"
                type="text"
                icon={<CloseCircleOutlined className="mr-px" />}
                className="!w-auto !h-auto !p-0 !bg-transparent text-neutral-500 hover:text-neutral-700 active:text-neutral-800 absolute right-2.5 top-1/2 -translate-y-1/2 z-20"
              ></Button>
            )}
          </div>
          {userExists && (
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input.Password
                ref={passwordRef}
                prefix={<LockOutlined className="w-5 text-neutral-600" />}
                placeholder="Password"
                className="[&>input.ant-input]:!shadow-[0_0_0_20px_white_inset] [&>input.ant-input:focus]:!shadow-[0_0_0_20px_white_inset]"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item className="!mb-0">
            <Button key="submit" type="primary" block htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
        {userExists && (
          <div className="flex justify-between -mt-1 -mb-1">
            <Button type="link" className="h-auto p-0 m-0">
              Trouble signing in?
            </Button>
            <Button type="link" className="h-auto p-0 m-0">
              Reset password
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SignInModal;
