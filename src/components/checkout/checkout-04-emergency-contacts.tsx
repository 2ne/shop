import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Collapse, Form, Input } from "antd";
import CheckoutStepHeader from "./checkout-header";
import { useBasketContext } from "../basket/basket-context";
import {
  emergencyContactFields,
  EmergencyContactField,
} from "../../types/types";

export interface CheckoutEmergencyContactsHandles {
  submitForm: () => Promise<boolean>;
}

interface CheckoutEmergencyContactsProps {
  title: string;
  subtitle: string;
  onFormValidation: (isValid: boolean) => void;
}

const CheckoutEmergencyContacts = forwardRef<
  CheckoutEmergencyContactsHandles,
  CheckoutEmergencyContactsProps
>(
  (
    { onFormValidation, title, subtitle }: CheckoutEmergencyContactsProps,
    ref: React.Ref<CheckoutEmergencyContactsHandles>
  ) => {
    const { basketItems, addEmergencyContact } = useBasketContext();
    const [emergencyContactForm] = Form.useForm();
    const emergencyContacts = [{ id: 1 }, { id: 2 }];

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await emergencyContactForm.validateFields();
          // If validation is successful, submit the form
          emergencyContactForm.submit();
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
    const onDetailsFinish = (values: any) => {
      addEmergencyContact();
      console.log("Add medical information:", values);
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    return (
      <>
        <CheckoutStepHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 8C9 8.41421 9.33579 8.75 9.75 8.75C10.1642 8.75 10.5 8.41421 10.5 8H9ZM13.5 8C13.5 8.41421 13.8358 8.75 14.25 8.75C14.6642 8.75 15 8.41421 15 8H13.5ZM17.25 19.25L17.25 18.5H17.25V19.25ZM6.75 19.25L6.75 20H6.75V19.25ZM19.25 17.25L20 17.25V17.25H19.25ZM19.25 10L18.5 10V10H19.25ZM17.25 8L17.25 8.75L17.25 8ZM6.75 8L6.75 7.25L6.75 8ZM4.75 10L4 10L4.75 10ZM4.75 17.25L5.5 17.25L4.75 17.25ZM15.25 14.25C15.6642 14.25 16 13.9142 16 13.5C16 13.0858 15.6642 12.75 15.25 12.75V14.25ZM8.75 12.75C8.33579 12.75 8 13.0858 8 13.5C8 13.9142 8.33579 14.25 8.75 14.25V12.75ZM12.75 10.75C12.75 10.3358 12.4142 10 12 10C11.5858 10 11.25 10.3358 11.25 10.75L12.75 10.75ZM11.25 16.25C11.25 16.6642 11.5858 17 12 17C12.4142 17 12.75 16.6642 12.75 16.25H11.25ZM10.75 4.75L10.75 5.5L10.75 4.75ZM9.75 5.75L9 5.75V5.75H9.75ZM13.25 4.75L13.25 4L13.25 4.75ZM14.25 5.75L15 5.75L15 5.75L14.25 5.75ZM13.25 4L10.75 4L10.75 5.5L13.25 5.5L13.25 4ZM9 5.75V8H10.5V5.75H9ZM13.5 5.75V8H15V5.75H13.5ZM17.25 18.5H6.75V20H17.25V18.5ZM20 17.25V10H18.5V17.25H20ZM17.25 7.25L6.75 7.25L6.75 8.75L17.25 8.75L17.25 7.25ZM4 10L4 17.25L5.5 17.25L5.5 10L4 10ZM6.75 7.25C5.23122 7.25 4 8.48122 4 10L5.5 10C5.5 9.30964 6.05964 8.75 6.75 8.75L6.75 7.25ZM20 10C20 8.48122 18.7688 7.25 17.25 7.25L17.25 8.75C17.9404 8.75 18.5 9.30964 18.5 10L20 10ZM6.75 18.5C6.05964 18.5 5.5 17.9404 5.5 17.25L4 17.25C4 18.7688 5.23122 20 6.75 20L6.75 18.5ZM17.25 20C18.7688 20 20 18.7688 20 17.25L18.5 17.25C18.5 17.9404 17.9404 18.5 17.25 18.5L17.25 20ZM15.25 12.75H12V14.25H15.25V12.75ZM12 12.75H8.75V14.25H12V12.75ZM11.25 10.75L11.25 13.5L12.75 13.5L12.75 10.75L11.25 10.75ZM11.25 13.5V16.25H12.75V13.5H11.25ZM10.75 4C9.7835 4 9 4.7835 9 5.75L10.5 5.75C10.5 5.61193 10.6119 5.5 10.75 5.5L10.75 4ZM13.25 5.5C13.3881 5.5 13.5 5.61193 13.5 5.75L15 5.75C15 4.7835 14.2165 4 13.25 4L13.25 5.5Z"
                fill="currentColor"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={emergencyContactForm}
          name="emergencyContactForm"
          onFinish={(values) => onDetailsFinish(values)}
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
          requiredMark="optional"
        >
          <Collapse
            defaultActiveKey={
              emergencyContacts.length > 0 ? [emergencyContacts[0].id] : []
            }
          >
            {emergencyContacts.map((contact) => {
              const [contactName, setContactName] = useState("");
              useEffect(() => {
                const nameFieldValue = emergencyContactForm.getFieldValue(
                  `contact_${contact.id}_name`
                );
                setContactName(nameFieldValue || "New contact");
              }, [emergencyContactForm, contact.id]);

              return (
                <Collapse.Panel
                  forceRender={true}
                  header={contactName}
                  key={contact.id}
                  className="[&:has(.ant-form-item-has-error)]:mb-px [&:has(.ant-form-item-has-error)]:ring-1 [&:has(.ant-form-item-has-error)]:ring-error first:rounded-t-[calc(0.375rem+1px)]"
                >
                  {emergencyContactFields.map(
                    (field: EmergencyContactField) => (
                      <Form.Item
                        key={field.key}
                        name={`contact_${contact.id}_${field.key}`}
                        label={field.label}
                        className="last:!mb-1.5"
                        rules={[
                          {
                            required: field.required,
                            message: `Please input your ${field.label.toLowerCase()}.`,
                          },
                        ]}
                        required={field.required}
                      >
                        <Input
                          type={field.type}
                          onChange={() => {
                            const nameFieldValue =
                              emergencyContactForm.getFieldValue(
                                `contact_${contact.id}_name`
                              );
                            setContactName(nameFieldValue || "New contact");
                          }}
                        />
                      </Form.Item>
                    )
                  )}
                </Collapse.Panel>
              );
            })}
          </Collapse>
        </Form>
      </>
    );
  }
);

export default CheckoutEmergencyContacts;
