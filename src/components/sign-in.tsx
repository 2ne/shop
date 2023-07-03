import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  Collapse,
  Typography,
  message,
} from "antd";
import type { InputRef } from "antd";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { orgLogo, orgName } from "../org";
import { useNavigate } from "react-router-dom";
const { Panel } = Collapse;
const { Paragraph } = Typography;

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
  const [signInForm] = Form.useForm();
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExists] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [signInFAQOpen, setSignInFAQOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [resetPasswordForm] = Form.useForm();

  useEffect(() => {
    if (isOpen && emailRef.current) {
      setTimeout(
        () =>
          emailRef.current?.focus({
            cursor: "start",
          }),
        200
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (userExists && passwordRef.current) {
      setTimeout(
        () =>
          passwordRef.current?.focus({
            cursor: "start",
          }),
        200
      );
    }
  }, [userExists]);

  const handleContinue = () => {
    if (email === "jamestoone@gmail.com") {
      setUserExists(true);
      setNewUser(false);
      if (password && password !== "password") {
        setPasswordValidation(true);
      }
      if (password === "password") {
        onClose();
        onSuccessfulLogin();
      }
    } else {
      setNewUser(true);
      setUserExists(false);
      setPasswordValidation(false);
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
    signInForm.resetFields();
    setTimeout(() => emailRef.current?.focus(), 100);
  };

  const onResetFinish = (values: any) => {
    console.log("Success:", values);
    setResetPasswordOpen(false);
    message.success(
      "Password reset email sent. Make sure to check your spam folder. "
    );
  };

  const onResetFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const navigate = useNavigate();

  return (
    <>
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
            id="signInForm"
            form={signInForm}
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
                help={
                  newUser &&
                  !userExists && (
                    <div className="mt-1 mb-4 text-sm">
                      No JoinIn account found. Try a different email or{" "}
                      <button
                        type="button"
                        onClick={() => {
                          navigate("/CreateAccount", {
                            state: { email: email },
                          });
                          onClose();
                        }}
                        className="link"
                      >
                        create a JoinIn account.
                      </button>
                    </div>
                  )
                }
                validateStatus={newUser ? "error" : ""}
              >
                <Input
                  type="email"
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
                  className="!w-auto !h-auto !p-0 !bg-transparent text-neutral-500 hover:text-neutral-700 active:text-neutral-800 absolute right-2.5 top-2 z-20"
                ></Button>
              )}
            </div>
            {userExists && (
              <Form.Item
                name="password"
                help={
                  passwordValidation && "Your email or password is incorrect"
                }
                validateStatus={passwordValidation ? "error" : ""}
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
              <Button
                type="link"
                className="h-auto p-0 m-0"
                onClick={() => setSignInFAQOpen(true)}
              >
                Trouble signing in?
              </Button>
              <Button
                type="link"
                className="h-auto p-0 m-0"
                onClick={() => setResetPasswordOpen(true)}
              >
                Reset password
              </Button>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        width={340}
        open={resetPasswordOpen}
        onCancel={() => setResetPasswordOpen(false)}
        footer={null}
        style={{ top: 152 }}
      >
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
            <h2 className="mb-1 text-base font-medium">Reset Password</h2>
            <div className="text-sm text-neutral-500">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </div>
          </div>
          <Form
            layout="vertical"
            name="basic"
            id="resetPasswordForm"
            form={resetPasswordForm}
            onFinish={onResetFinish}
            onFinishFailed={onResetFinishFailed}
          >
            <Form.Item
              name="current-email"
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
                type="email"
                prefix={<UserOutlined className="w-5 text-neutral-600" />}
                placeholder="Email address"
                className="[&>input.ant-input:disabled]:!shadow-[0_0_0_20px_#f5f5f5_inset] [&>input.ant-input]:!shadow-[0_0_0_20px_white_inset] [&>input.ant-input:focus]:!shadow-[0_0_0_20px_white_inset]"
              />
            </Form.Item>
            <Form.Item className="!mb-0">
              <Button key="submit" type="primary" block htmlType="submit">
                Reset password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="Trouble signing in?"
        open={signInFAQOpen}
        onOk={() => setSignInFAQOpen(false)}
        onCancel={() => setSignInFAQOpen(false)}
        footer={null}
        className="w-full max-w-xl"
      >
        <Collapse size="small" className="mb-1">
          <Panel
            header="How do I know if I have an existing JoinIn account?"
            key="1"
          >
            <Paragraph>
              If you've received an email from an organisation using JoinIn,
              you'll have a JoinIn account already. The email address that was
              contacted will be used for logging in. If you try to create an
              account again using the same email address, you will get an error
              telling you there is an account with that email address already
              and requesting that you login.
            </Paragraph>
          </Panel>
          <Panel
            header="My email or password is not being recognised, what do I do?"
            key="2"
          >
            <Paragraph>
              If you attempt to log in and you get the error “Login failed,
              Incorrect credentials” it means that either your email or password
              has not been recognised.
            </Paragraph>
            <Paragraph>
              If you know you have an account with this email, try a different
              password.
            </Paragraph>
            <Paragraph>
              Selecting Reset password and entering your email address will send
              a link to that email, where you can set a new password.
            </Paragraph>
            <Paragraph>
              If your email address was entered correctly and the email is not
              in your junk or spam folders, it may be because you do not have an
              account with that email address. To confirm that this email
              address is the one your account was created with, you can try to
              search for an old email from LoveAdmin. If you cannot find any
              contact from LoveAdmin to any email address you own, please
              contact the organisation directly to see if you are on their
              system.
            </Paragraph>
          </Panel>
          <Panel header="How do I create a JoinIn account?" key="3">
            <Paragraph>
              When you checkout a product from an organisation's shop page, you
              will be prompted to sign in or create an account. To create an
              account, select “Create account”. A form collecting basic account
              information will then appear.
            </Paragraph>
            <Paragraph>
              If you are purchasing a product on behalf of someone else, please
              note that the “Create account” form must be filled out with your
              details and not those of the child or dependant. As you continue
              with the checkout process after signing in, you will then be
              prompted to add the child or dependant's details.
            </Paragraph>
          </Panel>
          <Panel header="How do I reset my password?" key="4">
            <Paragraph>
              If you cannot remember your password and would like to reset it,
              click “Reset password” on the login screen and follow the
              instructions that arrive in the subsequent email.
            </Paragraph>
          </Panel>
          <Panel
            header="Why am I not receiving an email when trying to reset my password?"
            key="5"
          >
            <Paragraph>
              If your email address was entered correctly and the email is not
              in your junk or spam folders, it may be because you do not have an
              account with that email address. To confirm that this email
              address is the one your account was created with, you can try to
              search for an old email from LoveAdmin. If you cannot find any
              contact from LoveAdmin to any email address you own, please
              contact the organisation directly to see if you are on their
              system.
            </Paragraph>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
};

export default SignInModal;
