import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Collapse, Form, Input, Radio, RadioChangeEvent } from "antd";
import CheckoutStepHeader from "./checkout-header";
import { useBasketContext } from "../basket/basket-context";
import { BasketItem, MedicalInfo, medicalInfoFields } from "../../types/types";

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
    const { basketItems, addMedicalInfo } = useBasketContext();
    const [medicalInformationForm] = Form.useForm();
    const [medicalFields, setMedicalFields] = useState(false);

    useImperativeHandle(ref, () => ({
      // The 'submitForm' function is exposed to the parent component (checkout) via the ref so it can be called externally to trigger form validation and submission
      submitForm: async () => {
        try {
          // Validate all form fields
          await medicalInformationForm.validateFields();
          // If validation is successful, submit the form
          medicalInformationForm.submit();
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
    const onDetailsFinish = (
      values: { [key: string]: any },
      items: BasketItem[]
    ) => {
      // Loop through each item in the items array
      items.forEach((item) => {
        // Get the participants array from the current item, defaulting to an empty array if undefined
        const participants = item.participants ?? [];

        // Loop through each participant in the participants array
        participants.forEach((participant) => {
          // Get the participant's ID
          const participantId = participant.id;

          // Create an object to store the participant's medical information with the correct type
          const medicalInfo: MedicalInfo = {};

          // Loop through each field in the medicalInfoFields array
          medicalInfoFields.forEach((field) => {
            // Get the value for the current field from the form values object
            medicalInfo[field.key as keyof MedicalInfo] =
              values[`participant_${participantId}_${field.key}`];
          });

          // Call the addMedicalInfo function with the participant's ID and the medical info object
          addMedicalInfo(participantId, medicalInfo);
        });
      });

      // Log the basketItems to the console. Don't show required products
      console.log(
        "Add medical information:",
        basketItems.filter((item) => !item.requiredProduct?.isRequiredProduct)
      );
    };

    const onDetailsFinishFailed = (errorInfo: any) => {
      console.log(errorInfo);
    };

    const onMedicalChange = (e: RadioChangeEvent) => {
      const value = e.target.value;
      if (value === "yes") {
        setMedicalFields(true);
      } else {
        setMedicalFields(false);
        medicalInformationForm.setFieldsValue({ note: "" });
      }
    };

    return (
      <>
        <CheckoutStepHeader
          title={title}
          subtitle={subtitle}
          icon={
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="7.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></circle>
              <circle
                cx="12"
                cy="12"
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
                d="M7 17L9.5 14.5"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 17L14.5 14.5"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.5 9.5L7 7"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14.5 9.5L17 7"
              ></path>
            </svg>
          }
        />
        <Form
          layout="vertical"
          form={medicalInformationForm}
          name="medicalInformationForm"
          onFinish={(values) => onDetailsFinish(values, basketItems)}
          onFinishFailed={onDetailsFinishFailed}
          className="space-y-6 text-left hide-validation-asterix"
        >
          {basketItems.map((item) => {
            const participants = item.participants ?? [];
            return (
              <div key={item.id}>
                {participants.map((participant, index) => {
                  return (
                    <div
                      key={`participant_${index}`}
                      className="p-3 border rounded-md border-neutral-200 [&:has(.ant-form-item-has-error)]:border-error"
                    >
                      <div className="mb-2 font-medium">
                        {participant.firstName} {participant.lastName}
                      </div>
                      <Form.Item
                        name={`participant_${participant.id}`}
                        label="Any known disabilities, medical/behavioural conditions, dietary needs or current medications?"
                        className="!mb-0.5 [&_.ant-form-item-label]:font-normal"
                        rules={[
                          {
                            required: true,
                            message: "Please select an option",
                          },
                        ]}
                      >
                        <Radio.Group
                          className="flex text-center [&>*]:flex-1 mt-1"
                          onChange={(e) => onMedicalChange(e)}
                        >
                          <Radio.Button value="no">No</Radio.Button>
                          <Radio.Button value="yes">Yes</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      {medicalFields && (
                        <Collapse className="mt-4">
                          <Collapse.Panel header="Doctor's details" key="1">
                            {medicalInfoFields
                              .filter(
                                (field) => field.group === "doctorsDetails"
                              )
                              .map((field) => (
                                <Form.Item
                                  key={field.key}
                                  name={`participant_${participant.id}_${field.key}`}
                                  label={field.label}
                                  className="last:!mb-1.5"
                                >
                                  <Input />
                                </Form.Item>
                              ))}
                          </Collapse.Panel>
                          <Collapse.Panel header="Medical information" key="2">
                            {medicalInfoFields
                              .filter(
                                (field) => field.group === "medicalInformation"
                              )
                              .map((field) => (
                                <Form.Item
                                  key={field.key}
                                  name={`participant_${participant.id}_${field.key}`}
                                  label={field.label}
                                  className="last:!mb-1.5"
                                >
                                  <Input />
                                </Form.Item>
                              ))}
                          </Collapse.Panel>
                          <Collapse.Panel
                            header="Allergies & dietary requirements"
                            key="3"
                          >
                            {medicalInfoFields
                              .filter(
                                (field) => field.group === "allergiesAndDietary"
                              )
                              .map((field) => (
                                <Form.Item
                                  key={field.key}
                                  name={`participant_${participant.id}_${field.key}`}
                                  label={field.label}
                                  className="last:!mb-1.5"
                                >
                                  <Input />
                                </Form.Item>
                              ))}
                          </Collapse.Panel>
                        </Collapse>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Form>
      </>
    );
  }
);

export default CheckoutEmergencyContacts;
