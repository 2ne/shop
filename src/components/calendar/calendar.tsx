import React, { useEffect, useState } from "react";
import { Button, Checkbox, Collapse, Select } from "antd";
import { orgEvents, Event } from "../../org";
import CalendarEvent from "./calendar-event";
import {
  CalendarOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
const { Panel } = Collapse;

type SelectedValue = string | undefined;

const Calendar: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add("container-lg");

    return () => {
      document.documentElement.classList.remove("container-lg");
    };
  }, []);

  const [selectedValue, setSelectedValue] = useState<SelectedValue>(undefined);
  const [selectedValue1, setSelectedValue1] =
    useState<SelectedValue>(undefined);

  const handleReset = () => {
    setSelectedValue(undefined);
    setSelectedValue1(undefined);
  };

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };
  const handleChange1 = (value: string) => {
    setSelectedValue1(value);
  };

  const [activeDay, setActiveDay] = useState<string>(Object.keys(orgEvents)[0]);

  const daysList = Object.keys(orgEvents);

  const previousDay = () => {
    const index = daysList.indexOf(activeDay);
    if (index > 0) {
      setActiveDay(daysList[index - 1]);
    }
  };

  const nextDay = () => {
    const index = daysList.indexOf(activeDay);
    if (index < daysList.length - 1) {
      setActiveDay(daysList[index + 1]);
    }
  };

  const onClassOptionsChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <>
      <div className="mb-0.5 lg:-mt-3 lg:py-3 lg:mb-6 lg:flex lg:items-end lg:border-b lg:border-neutral-200 lg:sticky lg:top-0 lg:z-20 lg:bg-white/95 ring-2 ring-white/95">
        <div className="flex-grow w-full">
          <h2 className="heading-lg">Adult and Child Lessons</h2>
        </div>
        <div className="hidden mx-auto lg:block">
          <Button icon={<CalendarOutlined />}>July 2023</Button>
        </div>
        <div className="items-center justify-end flex-grow hidden w-full gap-2 lg:flex">
          <Button
            className="justify-center"
            icon={<LeftOutlined className="w-3 h-3 text-neutral-600" />}
          ></Button>
          <Button
            className="justify-center"
            icon={<RightOutlined className="w-3 h-3 text-neutral-600" />}
          ></Button>
        </div>
        <div className="max-lg:overflow-x-auto lg:hidden max-lg:z-30 max-lg:bg-white/95 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:ml-auto max-lg:py-2.5 max-lg:border-t max-lg:border-black/10">
          <div className="container flex lg:flex-wrap items-center gap-2 lg:gap-2.5 lg:p-0">
            <Select
              value={selectedValue}
              allowClear={true}
              placeholder="Class"
              onChange={handleChange}
              className="ant-select-token"
              popupClassName="ant-select-mobile"
              options={[
                { value: "bubbletheseahorse", label: "Bubble the Seahorse" },
                { value: "cutietheclam", label: "Cutie the Clam" },
                {
                  value: "danyythedolphin",
                  label: "Danny the Dolphin (SEND)",
                },
                { value: "ollietheoctopus", label: "Ollie the Octopus" },
                { value: "smileytheturle", label: "Smiley the Turtle" },
                { value: "snappythecrab", label: "Snappy the Crab" },
                { value: "swishytheseal", label: "Swishy the Seal" },
                {
                  value: "twinklethestarfish",
                  label: "Twinkle The Starfish ",
                },
              ]}
            />
            <Select
              value={selectedValue1}
              allowClear={true}
              placeholder="Location"
              onChange={handleChange1}
              className="ant-select-token"
              popupClassName="ant-select-mobile"
              options={[{ value: "littleThetford", label: "Little Thetford" }]}
            />
            {(selectedValue || selectedValue1) && (
              <Button
                type="link"
                onClick={handleReset}
                className="!bg-white !-ml-2 lg:hidden"
                title="Clear filters"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-20 flex items-center gap-2 py-3.5 mb-2 bg-gradient-to-b from-white/95 lg:hidden">
        <Button
          onClick={previousDay}
          className="justify-center !bg-white"
          icon={<LeftOutlined className="w-3 h-3 text-neutral-600" />}
        ></Button>
        <div className="flex-grow text-center">
          <Button className="!bg-white" block icon={<CalendarOutlined />}>
            {activeDay} 5 July
          </Button>
        </div>
        <Button
          onClick={nextDay}
          className="justify-center !bg-white"
          icon={<RightOutlined className="w-3 h-3 text-neutral-600" />}
        ></Button>
      </div>
      <div className="grid grid-cols-1 gap-2.5 p-px lg:hidden">
        {orgEvents[activeDay].map((event: Event, index: number) => (
          <CalendarEvent
            key={`${index}`}
            activeDay={activeDay}
            index={index}
            event={{
              img: event.img,
              hideImage: event.hideImage,
              title: event.title,
              description: event.description,
              link: event.link,
              address: event.address,
              startTime: event.startTime,
              endTime: event.endTime,
              price: event.price,
              colour: event.colour,
            }}
          />
        ))}
      </div>
      <div className="hidden lg:gap-10 lg:grid lg:grid-cols-5 xl:grid-cols-6">
        <div className="-mt-1.5">
          <div className="sticky z-10 top-16">
            <Collapse
              defaultActiveKey={["1"]}
              ghost
              bordered={false}
              className="ant-collapse-calendar"
              expandIconPosition="end"
              expandIcon={({ isActive }) => (
                <DownOutlined
                  className="!text-neutral-500"
                  rotate={isActive ? 180 : 0}
                />
              )}
            >
              <Panel header="Class" key="1">
                <Checkbox.Group
                  onChange={onClassOptionsChange}
                  className="space-y-1.5"
                >
                  <Checkbox value="Bubble the Seahorse">
                    <div className="bg-yellow-50 text-yellow-800 px-1.5 rounded">
                      Bubble the Seahorse
                    </div>
                  </Checkbox>
                  <Checkbox value="Cutie the Clam">
                    <div className="bg-lime-50 text-lime-800 px-1.5 rounded">
                      Cutie the Clam
                    </div>
                  </Checkbox>
                  <Checkbox value="Danny the Dolphin">
                    <div className="bg-sky-50 text-sky-800 px-1.5 rounded">
                      Danny the Dolphin
                    </div>
                  </Checkbox>
                  <Checkbox value="Ollie the Octopus">
                    <div className="bg-pink-50 text-pink-800 px-1.5 rounded">
                      Ollie the Octopus
                    </div>
                  </Checkbox>
                  <Checkbox value="Smiley the Turtle">
                    <div className="bg-emerald-50 text-emerald-800 px-1.5 rounded">
                      Smiley the Turtle
                    </div>
                  </Checkbox>
                  <Checkbox value="Snappy the Crab">
                    <div className="bg-red-50 text-red-800 px-1.5 rounded">
                      Snappy the Crab
                    </div>
                  </Checkbox>
                  <Checkbox value="Swishy the Seal">
                    <div className="bg-stone-50 text-stone-800 px-1.5 rounded">
                      Swishy the Seal
                    </div>
                  </Checkbox>
                  <Checkbox value="Twinkle the Starfish">
                    <div className="bg-blue-50 text-blue-800 px-1.5 rounded">
                      Twinkle the Starfish
                    </div>
                  </Checkbox>
                </Checkbox.Group>
              </Panel>
              <Panel header="Location" key="2">
                few
              </Panel>
              <Panel header="Gender" key="3">
                few
              </Panel>
              <Panel header="Age (year)" key="4">
                few
              </Panel>
              <Panel header="Coach" key="5">
                few
              </Panel>
              <Panel header="Time of day" key="6">
                few
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className="items-start hidden w-full gap-2 -mt-2 lg:col-span-4 xl:col-span-5 lg:flex">
          {Object.entries(orgEvents).map(([day, events]) => (
            <div key={day} className="max-w-[25%] w-full min-w-0">
              <div className="sticky z-10 hidden pt-2.5 pb-2 text-center mb-1 lg:block top-14 bg-white/95 heading-sm ring-2 ring-white/95">
                {day}
              </div>
              <div className="grid grid-cols-1 gap-2 p-px">
                {events.map((event: Event, index: number) => (
                  <CalendarEvent
                    key={`${index}`}
                    activeDay={activeDay}
                    index={index}
                    event={{
                      img: event.img,
                      hideImage: event.hideImage,
                      title: event.title,
                      description: event.description,
                      link: event.link,
                      address: event.address,
                      startTime: event.startTime,
                      endTime: event.endTime,
                      price: event.price,
                      colour: event.colour,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
