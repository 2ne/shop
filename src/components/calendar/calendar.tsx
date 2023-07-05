import React, { useEffect, useState } from "react";
import { Button, Checkbox, Collapse, DatePicker, Select } from "antd";
import { orgEvents, Event } from "../../org";
import CalendarEvent from "./calendar-event";
import {
  CalendarOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs from "dayjs";
const { Panel } = Collapse;

type SelectedValue = string | undefined;

const Calendar: React.FC = () => {
  const [date, setDate] = useState(dayjs());
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleDateChange = (value: any) => {
    setDate(value);
    setOpen(false);
  };

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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const previousDay = () => {
    const index = daysOfWeek.indexOf(activeDay);
    if (index > 0) {
      setActiveDay(daysOfWeek[index - 1]);
    }
  };

  const nextDay = () => {
    const index = daysOfWeek.indexOf(activeDay);
    if (index < daysOfWeek.length - 1) {
      setActiveDay(daysOfWeek[index + 1]);
    }
  };

  // fake stuff to make it look like this week and today is active
  let fakeDateNumberCounter = getMondayDate();
  const fakeToday = getCurrentDate();

  function getMondayDate() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = dayOfWeek - 1; // Monday is the first day of the week

    today.setDate(today.getDate() - difference);
    return today.getDate();
  }

  function getCurrentDate() {
    const today = new Date();
    return today.getDate();
  }

  const monthYearFormat = "MMMM YYYY";

  const NoEventsToday = () => {
    return (
      <div className="pt-1 space-y-1 text-sm text-center cursor-default text-neutral-400">
        <div>
          <CalendarOutlined className="text-xl" />
        </div>
        <div>No events</div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-0.5 lg:-mt-3 lg:py-3 lg:mb-6 lg:flex lg:items-end lg:border-b lg:border-neutral-200 lg:sticky lg:top-0 lg:z-20 lg:bg-white/95 ring-2 ring-white/95">
        <div className="flex-grow w-full">
          <h2 className="heading-lg">Adult and Child Lessons</h2>
        </div>
        <div className="relative hidden h-8 mx-auto lg:block">
          <DatePicker
            value={date}
            format={monthYearFormat}
            picker="date"
            allowClear={false}
            open={open}
            onOpenChange={handleOpenChange}
            onChange={handleDateChange}
            className="relative opacity-0 pointer-events-none"
            popupClassName="!left-1/2 !-translate-x-1/2"
          />
          <Button
            className="!bg-white -top-8 relative"
            icon={<CalendarOutlined />}
            onClick={() => setOpen(true)}
          >
            {date.format(monthYearFormat)}
          </Button>
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
            {activeDay} {fakeDateNumberCounter} July
          </Button>
        </div>
        <Button
          onClick={nextDay}
          className="justify-center !bg-white"
          icon={<RightOutlined className="w-3 h-3 text-neutral-600" />}
        ></Button>
      </div>
      <div className="grid grid-cols-1 gap-2.5 p-px lg:hidden">
        {(orgEvents[activeDay] || []).length > 0 ? (
          orgEvents[activeDay].map((event: Event, index: number) => (
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
          ))
        ) : (
          <NoEventsToday />
        )}
      </div>

      <div className="hidden lg:gap-6 lg:grid lg:grid-cols-5 xl:grid-cols-6">
        <div className="-mt-1.5">
          <div className="sticky z-10 top-16">
            <Collapse
              defaultActiveKey={["1", "2"]}
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
                <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                  <Checkbox value="Bubble the Seahorse">
                    <div className="bg-yellow-50 text-yellow-800 px-1.5 rounded truncate">
                      Bubble the Seahorse
                    </div>
                  </Checkbox>
                  <Checkbox value="Cutie the Clam">
                    <div className="bg-lime-50 text-lime-800 px-1.5 rounded truncate">
                      Cutie the Clam
                    </div>
                  </Checkbox>
                  <Checkbox value="Danny the Dolphin">
                    <div className="bg-sky-50 text-sky-800 px-1.5 rounded truncate">
                      Danny the Dolphin
                    </div>
                  </Checkbox>
                  <Checkbox value="Ollie the Octopus">
                    <div className="bg-pink-50 text-pink-800 px-1.5 rounded truncate">
                      Ollie the Octopus
                    </div>
                  </Checkbox>
                  <Checkbox value="Smiley the Turtle">
                    <div className="bg-emerald-50 text-emerald-800 px-1.5 rounded truncate">
                      Smiley the Turtle
                    </div>
                  </Checkbox>
                  <Checkbox value="Snappy the Crab">
                    <div className="bg-red-50 text-red-800 px-1.5 rounded truncate">
                      Snappy the Crab
                    </div>
                  </Checkbox>
                  <Checkbox value="Swishy the Seal">
                    <div className="bg-stone-50 text-stone-800 px-1.5 rounded truncate">
                      Swishy the Seal
                    </div>
                  </Checkbox>
                  <Checkbox value="Twinkle the Starfish">
                    <div className="bg-blue-50 text-blue-800 px-1.5 rounded truncate">
                      Twinkle the Starfish
                    </div>
                  </Checkbox>
                </Checkbox.Group>
              </Panel>
              <Panel header="Time of day" key="2">
                <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                  <Checkbox value="Morning">
                    <div className="truncate">
                      <span>Morning</span>
                      <span className="text-neutral-500"> · 00:00 - 12:00</span>
                    </div>
                  </Checkbox>
                  <Checkbox value="Afternoon">
                    <div className="truncate">
                      <span>Afternoon</span>
                      <span className="text-neutral-500"> · 12:00 - 18:00</span>
                    </div>
                  </Checkbox>
                  <Checkbox value="Evening">
                    <div className="truncate">
                      <span>Evening</span>
                      <span className="text-neutral-500"> · 18:00 - 00:00</span>
                    </div>
                  </Checkbox>
                </Checkbox.Group>
              </Panel>
              <Panel header="Location" key="3">
                few
              </Panel>
              <Panel header="Gender" key="4">
                few
              </Panel>
              <Panel header="Age (year)" key="5">
                few
              </Panel>
              <Panel header="Coach" key="6">
                few
              </Panel>
            </Collapse>
          </div>
        </div>
        <div className="hidden w-full gap-2 -mt-3 lg:col-span-4 xl:col-span-5 lg:flex">
          {daysOfWeek.map((day) => (
            <div key={day} className="max-w-[25%] w-full min-w-0">
              <div className="sticky z-10 hidden pt-2.5 pb-2 text-center mb-1 lg:block top-14 bg-white/95 heading-sm ring-2 ring-white/95">
                <span
                  className={`inline-flex gap-x-1 rounded px-2 py-1 
            ${
              fakeDateNumberCounter === fakeToday
                ? " bg-primary text-primary_text "
                : " "
            }
          `}
                >
                  <span>{day.substring(0, 3)}</span>
                  <span
                    className={
                      fakeDateNumberCounter === fakeToday
                        ? "text-primary_text"
                        : "text-neutral-500"
                    }
                  >
                    0{fakeDateNumberCounter++}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 p-px">
                {(orgEvents[day] || []).length > 0 ? (
                  orgEvents[day].map((event: Event, index: number) => (
                    <>
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
                    </>
                  ))
                ) : (
                  <NoEventsToday />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendar;
