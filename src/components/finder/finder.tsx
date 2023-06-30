import React, { useState } from "react";
import DateOfBirthInput from "../dob-input";
import { Button, Form, Radio } from "antd";
import FormHeader from "../form-header";
import { SearchOutlined } from "@ant-design/icons";
import { RadioChangeEvent } from "antd/lib/radio";

const Finder: React.FC = () => {
  const [findLevel, setFindLevel] = useState(false);
  const [age, setAge] = useState(0);
  const [agePopulated, setAgePopulated] = useState(false);

  const handleFindLevel = () => {
    if (agePopulated) {
      setFindLevel(true);
    }
  };

  const [canEnterWater, setCanEnterWater] = useState<number | undefined>(
    undefined
  );
  const [canExitWater, setCanExitWater] = useState<number | undefined>(
    undefined
  );

  const handleCanEnterWaterChange = (e: RadioChangeEvent) => {
    setCanEnterWater(e.target.value);
    if (e.target.value === 2) {
      setCanExitWater(2);
    }
  };

  const handleCanExitWaterChange = (e: RadioChangeEvent) => {
    setCanExitWater(e.target.value);
  };

  const handleDateChange = (
    index: number,
    day: string,
    month: string,
    year: string,
    age: number | null
  ) => {
    if (age) {
      setAge(age);
      setAgePopulated(true);
    } else {
      setAgePopulated(false);
    }
  };

  const resetLevels = () => {
    setCanEnterWater(undefined);
    setCanExitWater(undefined);
  };

  return (
    <div className="lg:mt-[4vh] lg:mb-20 mb-8 lg:flex lg:justify-between lg:gap-16 items-center">
      <div className="shrink-0 w-full lg:max-w-[22rem] relative">
        <div className="relative z-10 space-y-6">
          <div className="lg:text-center">
            <FormHeader
              title="Swim Class Finder"
              subtitle="Enter the participant's details and we'll find the perfect classes for them"
            />
          </div>
          {!findLevel && (
            <section>
              <Form layout="vertical" requiredMark={false}>
                <div className="relative p-4 mb-4 bg-white border rounded-md border-neutral-200">
                  <div className="-mb-6">
                    <DateOfBirthInput
                      onDateChange={(day, month, year, age) =>
                        handleDateChange(0, day, month, year, age)
                      }
                    />
                  </div>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  icon={<SearchOutlined />}
                  className="mt-2"
                  onClick={handleFindLevel}
                >
                  Find Level
                </Button>
              </Form>
            </section>
          )}
          {findLevel && (
            <section>
              <Form layout="vertical" requiredMark={false}>
                <div className="relative p-4 bg-white border rounded-md border-neutral-200">
                  <div className="-mb-7 empty:hidden">
                    {canEnterWater === undefined && (
                      <Form.Item label="Can they enter the water?">
                        <Radio.Group onChange={handleCanEnterWaterChange}>
                          <Radio value={1}>Yes</Radio>
                          <Radio value={2}>No</Radio>
                        </Radio.Group>
                      </Form.Item>
                    )}
                    {canEnterWater === 1 && canExitWater === undefined && (
                      <Form.Item label="Can they exit the water?">
                        <Radio.Group onChange={handleCanExitWaterChange}>
                          <Radio value={1}>Yes</Radio>
                          <Radio value={2}>No</Radio>
                        </Radio.Group>
                      </Form.Item>
                    )}
                  </div>
                  {canEnterWater === 2 && (
                    <div className="space-y-3 text-sm">
                      <div>
                        Your {age} year old fits into our Level 1 - Seahorse
                        group.
                      </div>
                      <div>
                        You can find classes for this level below or{" "}
                        <a onClick={resetLevels} className="link">
                          find new level
                        </a>{" "}
                        if you don't think this level is correct.
                      </div>
                    </div>
                  )}
                  {canEnterWater === 1 && canExitWater === 2 && <p>Level 2</p>}
                  {canEnterWater === 1 && canExitWater === 1 && <p>Level 3</p>}
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  icon={<SearchOutlined />}
                  className="mt-6"
                  onClick={handleFindLevel}
                >
                  Find Classes
                </Button>
              </Form>
            </section>
          )}
        </div>
        <div
          className="absolute -inset-16 bg-grid bg-[bottom_1px_center] pointer-events-none"
          style={{
            maskImage: "radial-gradient(black, transparent)",
            WebkitMaskImage: "radial-gradient(black, transparent)",
          }}
        ></div>
      </div>
      <div className="sticky hidden mt-0.5 lg:block top-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1600965962102-9d260a71890d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1574744918163-6cef6f4a31b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1487491506942-373c8f7a7ad5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1622629797619-c100e3e67e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2662&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1558617320-e695f0d420de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1560088971-123158b94b34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1600965962323-6362f726c3f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-cover object-center h-full max-w-full transition-opacity rounded-lg"
                src="https://images.unsplash.com/photo-1630049038179-afaaebb62fe2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2450&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finder;
