import React, { useState } from "react";
import { Button, Select } from "antd";
import { orgEvents, Event } from "../org";
import { Link } from "react-router-dom";

type SelectedValue = string | undefined;

const CalendarWeek: React.FC = () => {
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

  return (
    <>
      <div className="mb-0.5 lg:-mt-3 lg:py-3 lg:mb-8 lg:flex lg:items-end lg:border-b lg:border-neutral-200 lg:sticky lg:top-0 lg:z-10 lg:bg-white/95">
        <h2 className="heading-lg">Adult and Child Lessons</h2>
        <div className="max-lg:overflow-x-auto max-lg:z-30 max-lg:bg-white/95 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:ml-auto max-lg:py-2.5 max-lg:border-t max-lg:border-black/10">
          <div className="container flex items-center gap-2 lg:gap-2.5 lg:p-0">
            <span className="hidden lg:block heading-sm">Filter</span>
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
                <span className="font-medium">Clear</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-20 flex items-center gap-3 py-3.5 mb-2 bg-gradient-to-b from-white/95 lg:hidden">
        <Button
          onClick={previousDay}
          shape="circle"
          className="!rounded-md bg-white"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-auto"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13.25 8.75L9.75 12L13.25 15.25"
            ></path>
          </svg>
        </Button>
        <div className="flex-grow text-center">
          <Button block={true} className="!bg-white">
            <span className="font-medium">{activeDay}</span>
          </Button>
        </div>
        <Button
          onClick={nextDay}
          shape="circle"
          className="!rounded-md bg-white"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-auto"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 p-px lg:hidden">
        {orgEvents[activeDay].map((event: Event, index: number) => (
          <Link
            key={`${activeDay}-event-${index}`}
            to={event.link}
            className="block p-3 text-sm card max-lg:grid max-lg:gap-4 max-sm:grid-cols-4 max-lg:grid-cols-3 max-lg:items-center"
          >
            <img
              className="aspect-[3/2] object-cover mx-auto max-lg:col-span-1"
              src={event.img}
            />
            <div className="space-y-0.5 max-sm:col-span-3 max-lg:col-span-2">
              <h3 className="mb-1.5 heading-sm truncate">{event.title}</h3>
              <div className="flex items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="-ml-1 text-neutral-500 shrink-0"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.25 11C18.25 15 12 19.25 12 19.25C12 19.25 5.75 15 5.75 11C5.75 7.5 8.68629 4.75 12 4.75C15.3137 4.75 18.25 7.5 18.25 11Z"
                  ></path>
                  <circle
                    cx="12"
                    cy="11"
                    r="2.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></circle>
                </svg>
                <span className="truncate">{event.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="-ml-1 text-neutral-500 shrink-0"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="7.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M12 8V12L14 14"
                  ></path>
                </svg>

                <span>{event.startTime}</span>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 -mx-1.5 text-neutral-500"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  ></path>
                </svg>
                <span>{event.endTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="-ml-1 text-neutral-500 shrink-0"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="7.25"
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
                    d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 7.75V8.25"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 15.75V16.25"
                  ></path>
                </svg>
                <span>{event.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="hidden w-full gap-3 lg:flex">
        {Object.entries(orgEvents).map(([day, events]) => (
          <div key={day} className="max-w-[25%] w-full min-w-0">
            <div className="hidden mb-2 lg:block">
              <span className="heading">{day}</span>
            </div>
            <div className="flex flex-col gap-3">
              {events.map((event: Event, index: number) => (
                <Link
                  key={`${day}-event-${index}`}
                  to={event.link}
                  className="block p-3 text-sm card max-lg:grid max-lg:gap-4 max-sm:grid-cols-4 max-lg:grid-cols-3 max-lg:items-center"
                >
                  <img
                    className="aspect-[3/2] object-cover mx-auto max-lg:col-span-1"
                    src={event.img}
                  />
                  <div className="space-y-0.5 max-sm:col-span-3 max-lg:col-span-2">
                    <h3 className="mb-1.5 heading-sm truncate">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="-ml-1 text-neutral-500 shrink-0"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M18.25 11C18.25 15 12 19.25 12 19.25C12 19.25 5.75 15 5.75 11C5.75 7.5 8.68629 4.75 12 4.75C15.3137 4.75 18.25 7.5 18.25 11Z"
                        ></path>
                        <circle
                          cx="12"
                          cy="11"
                          r="2.25"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        ></circle>
                      </svg>
                      <span className="truncate">{event.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="-ml-1 text-neutral-500 shrink-0"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="7.25"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        ></circle>
                        <path
                          stroke="currentColor"
                          strokeWidth="1.5"
                          d="M12 8V12L14 14"
                        ></path>
                      </svg>

                      <span>{event.startTime}</span>
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 -mx-1.5 text-neutral-500"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M10.75 8.75L14.25 12L10.75 15.25"
                        ></path>
                      </svg>
                      <span>{event.endTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="-ml-1 text-neutral-500 shrink-0"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="7.25"
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
                          d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75"
                        ></path>
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 7.75V8.25"
                        ></path>
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 15.75V16.25"
                        ></path>
                      </svg>
                      <span>{event.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CalendarWeek;
