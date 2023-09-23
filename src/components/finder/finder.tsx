import React, { useEffect, useState } from "react";
import DateOfBirthInput from "../dob-input";
import { Button, Form, Radio, Select } from "antd";
import FormHeader from "../form-header";
import { SearchOutlined } from "@ant-design/icons";
import FinderSwim from "./finder-swim";
import FinderDecoration from "./finder-decoration";
import Skills from "./dev-programme";

type FinderState = {
  radioValue: string | null;
  currentLevel: number | null;
  currentQuestionIndex: number;
  showLevel: boolean;
  dobInfo: {
    day: string | null;
    month: string | null;
    year: string | null;
    age: number | null;
    dob: Date | null;
  };
};

const initialState: FinderState = {
  radioValue: null,
  currentLevel: null,
  currentQuestionIndex: 0,
  showLevel: false,
  dobInfo: {
    day: "",
    month: "",
    year: "",
    age: null,
    dob: null,
  },
};

const Finder: React.FC = () => {
  const [form] = Form.useForm();
  const [state, setState] = useState<FinderState>(initialState);

  const handleDOBChange = (data: {
    day: string;
    month: string;
    year: string;
    age: number | null;
    dob: Date | null;
  }) => {
    setState((prev) => ({
      ...prev,
      dobInfo: {
        ...prev.dobInfo,
        day: data.day,
        month: data.month,
        year: data.year,
        age: data.age ? data.age : prev.dobInfo.age,
        dob: data.dob ? data.dob : prev.dobInfo.dob,
      },
    }));
    console.log("Day:", data.day);
    console.log("Month:", data.month);
    console.log("Year:", data.year);
    console.log("The age is:", data.age);
    console.log("The date changed:", data.dob);
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, radioValue: null }));
  }, [state.currentQuestionIndex, state.currentLevel]);

  const resetFinder = () => setState(initialState);

  const handleAnswer = (answer: boolean) => {
    if (!answer && state.currentLevel! > 1) {
      setState((prev) => ({
        ...prev,
        currentLevel: state.currentLevel! - 1,
        currentQuestionIndex: 0,
      }));
      return;
    }

    const nextQuestion = state.currentQuestionIndex + 1;

    if (nextQuestion < Skills[state.currentLevel! - 1].questions.length) {
      setState((prev) => ({ ...prev, currentQuestionIndex: nextQuestion }));
    } else {
      setState((prev) => ({ ...prev, showLevel: true }));
    }
  };

  const onFinish = (values: any) => {
    setState((prev) => ({ ...prev, currentLevel: 3 }));
  };

  const { radioValue, currentLevel, currentQuestionIndex, showLevel, dobInfo } =
    state;
  const { day, month, year, age } = dobInfo;

  return (
    <div className="items-center mb-8 lg:mb-20 lg:flex lg:justify-between lg:gap-16">
      <div className="shrink-0 w-full lg:max-w-[22rem] relative lg:mt-[-5vh]">
        <FinderDecoration />
        {!showLevel ? (
          <div className="relative z-10 space-y-6">
            <FormHeader
              title="Class Finder"
              subtitle={
                currentLevel === null
                  ? "Enter the participant's details and we'll find the perfect classes for them"
                  : "Answer the question below to help determine your participant's level"
              }
            />
            {currentLevel === null ? (
              <section>
                <Form
                  form={form}
                  name="form"
                  layout="vertical"
                  requiredMark="optional"
                  onFinish={onFinish}
                >
                  <div className="relative p-4 pb-5 mb-4 bg-white rounded-md shadow ring-1 ring-black ring-opacity-5">
                    <Form.Item
                      name="dateOfBirth"
                      label={
                        <div className="flex">
                          <div>Date of birth</div>
                          {age !== null && (
                            <div className="text-neutral-500">
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
                      rules={[
                        {
                          required: true,
                          message: "Please enter a date of birth",
                        },
                        {
                          validator: (_, value) => {
                            if (day && (Number(day) < 1 || Number(day) > 31)) {
                              return Promise.reject("Day must be between 1-31");
                            }
                            if (
                              month &&
                              (Number(month) < 1 || Number(month) > 12)
                            ) {
                              return Promise.reject(
                                "Month must be between 1-12"
                              );
                            }
                            const currentYear = new Date().getFullYear();
                            if (
                              year &&
                              (Number(year) < 1900 ||
                                Number(year) > currentYear)
                            ) {
                              return Promise.reject(
                                `Year must be between 1900 and ${currentYear}`
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                      className="[&_.ant-form-item-control-input-content]:grid [&_.ant-form-item-control-input-content]:grid-cols-3"
                      extra="Example · 30/04/1970"
                    >
                      <DateOfBirthInput onChange={handleDOBChange} />
                    </Form.Item>
                    <Form.Item
                      name="skillLevel"
                      label="Skill level"
                      rules={[{ required: false }]}
                      className="relative"
                    >
                      <Select
                        placeholder="Select a level..."
                        options={[
                          { value: "1", label: "Level 1" },
                          { value: "2", label: "Level 2" },
                          { value: "3", label: "Level 3" },
                        ]}
                      ></Select>
                    </Form.Item>
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    icon={<SearchOutlined />}
                    className="mt-3"
                  >
                    Find Level
                  </Button>
                </Form>
              </section>
            ) : (
              <section>
                <Form
                  layout="vertical"
                  requiredMark={false}
                  className="min-h-[164px] flex items-end w-full"
                >
                  <Form.Item
                    className="[&_.ant-form-item-label>label]:!text-base w-full flex-grow"
                    label={
                      Skills[currentLevel - 1].questions[currentQuestionIndex]
                    }
                  >
                    <Radio.Group
                      className="w-full"
                      size="large"
                      value={state.radioValue}
                      onChange={(e) => {
                        setState((prev) => ({
                          ...prev,
                          radioValue: e.target.value,
                        }));
                        handleAnswer(e.target.value === "yes");
                      }}
                    >
                      <div className="grid grid-cols-2 gap-4 mt-2 text-center">
                        <Radio.Button
                          value="yes"
                          className="group shadow-sm hover:shadow-md before:!hidden border rounded-md w-full !h-auto flex justify-center pt-4 pb-1.5 text-emerald-600 hover:text-emerald-600 font-medium"
                        >
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="w-10 h-10 p-1 transition-all rounded-full bg-emerald-100 group-hover:bg-emerald-500 group-hover:text-white"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M7.75 12.75l2.25 2.5 6.25-6.5"
                              ></path>
                            </svg>
                          </div>
                          <div>Yes</div>
                        </Radio.Button>
                        <Radio.Button
                          value="no"
                          className="group shadow-sm hover:shadow-md before:!hidden border rounded-md w-full !h-auto flex justify-center pt-4 pb-1.5 text-rose-600 hover:text-rose-600 font-medium"
                        >
                          <div>
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                              className="w-10 h-10 p-2 transition-all rounded-full bg-rose-100 group-hover:bg-rose-500 group-hover:text-white"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.75"
                                d="M17.25 6.75l-10.5 10.5M6.75 6.75l10.5 10.5"
                              ></path>
                            </svg>
                          </div>
                          <div>No</div>
                        </Radio.Button>
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </section>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 font-medium">
              You are Level {currentLevel}!
            </div>
            <Button onClick={resetFinder}>Reset</Button>
          </>
        )}
      </div>
      <FinderSwim />
    </div>
  );
};

export default Finder;
