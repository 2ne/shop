import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Empty, Form, Input, Space } from "antd";
import FormHeader from "../form-header";
import { useLocation } from "react-router-dom";
import DateOfBirthInput from "../dob-input";
const FormItem = Form.Item;

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
    const [age, setAge] = useState(0);
    const [accountOwnerForm] = Form.useForm();
    const [getFieldDecorator] = Form.useForm();
    const location = useLocation();
    const email = location.state?.email;
    // const [isAgeNotValid, setIsAgeNotValid] = useState(true);
    const [isDayInvalid, setIsDayInvalid] = useState(false);
    const [isMonthInvalid, setIsMonthInvalid] = useState(false);
    const [isYearInvalid, setIsYearInvalid] = useState(false);
    const thisYear = new Date().getFullYear();
    const [isAfterSubmit, setIsAfterSubmit] = useState(false);

    // console.log("this year", thisYear);

    // console.log("accountOwnerForm", accountOwnerForm)

    const [dateOfBirth, setDateOfBirth] = useState<{
      day: string;
      month: string;
      year: string;
    }>({
      day: "",
      month: "",
      year: "",
    });

    const handleDateChange = (day: string, month: string, year: string) => {
      setDateOfBirth({ day, month, year });
      // console.log("Date of Birth changed:", { day, month, year, age });
    };

    // const handleDateOfBirthValidation

    const customDateValidator = (value: any) => {
      if (isAfterSubmit) {
        if (
          dateOfBirth.day == "" &&
          dateOfBirth.month == "" &&
          dateOfBirth.year == ""
        ) {
          setIsDayInvalid(true);
          setIsMonthInvalid(true);
          setIsYearInvalid(true);
          return Promise.reject("Please enter a date of birth");
        }
        if (
          dateOfBirth.day !== "" &&
          dateOfBirth.month == "" &&
          dateOfBirth.year == ""
        ) {
          return Promise.reject("Complete Date of Birth is required.");
        }
        if (parseInt(dateOfBirth.day) >= 1 && parseInt(dateOfBirth.day) <= 31) {
          Promise.resolve();
          setIsDayInvalid(false);
        } else {
          setIsDayInvalid(true);
          return Promise.reject("Day must be between 01 and 31.");
        }
        if (
          parseInt(dateOfBirth.month) >= 0 &&
          parseInt(dateOfBirth.month) <= 12
        ) {
          Promise.resolve();
          setIsMonthInvalid(false);
        } else {
          setIsMonthInvalid(true);
          return Promise.reject("Month must be between 01 and 12.");
        }

        if (
          parseInt(dateOfBirth.year) >= 1900 &&
          parseInt(dateOfBirth.year) <= thisYear
        ) {
          Promise.resolve();
          setIsYearInvalid(false);
        } else {
          setIsYearInvalid(true);
          return Promise.reject(
            "Enter a valid year (e.g., between 1900 and current year)."
          );
        }
      }
      return Promise.resolve();
    };

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        setIsAfterSubmit(true);
        try {
          // Validate all form fields
          await accountOwnerForm.validateFields();
          // If validation is successful, submit the form
          accountOwnerForm.submit();
          console.log("age", age);
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
      console.log("error info", errorInfo);
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
          requiredMark="optional"
        >
          <Form.Item
            label="Email"
            name="email"
            initialValue={email}
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
            <Input autoComplete="given-name" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input autoComplete="family-name" />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            initialValue={dateOfBirth}
            label={
              <div className="flex">
                <div>Date of birth</div>
                {age !== null && (
                  <div className="text-gray-500">
                    <span>
                      <span className="mx-1">·</span>
                      {age} year
                    </span>
                    <span>{age > 1 ? "s" : ""}</span>
                    <span> old</span>
                  </div>
                )}
              </div>
            }
            rules={[{ validator: customDateValidator }]}
            validateStatus="success"
            className="[&_.ant-form-item-control-input-content]:grid [&_.ant-form-item-control-input-content]:grid-cols-3"
            extra="Example · 30/04/1970"
          >
            {/* <div style={{display: 'flex', width: '100%'}}> */}
            <DateOfBirthInput
              setAge={setAge}
              dateOfBirth={dateOfBirth}
              onChange={setDateOfBirth}
              isDayInvalid={isDayInvalid}
              isMonthInvalid={isMonthInvalid}
              isYearInvalid={isYearInvalid}
            />
            {/* </div> */}

            {/* using this input to triggers the error  */}
            {/* <Input type="date" style={{display: 'none'}} /> */}
          </Form.Item>
        </Form>
      </>
    );
  }
);

export default CreateAccountOwnerForms;
