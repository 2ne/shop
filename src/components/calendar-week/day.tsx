import { Button } from "antd";
import React from "react";
import CalendarWeekDayEvent from "./event";

interface CalendarWeekDayProps {
  day: string;
}

const CalendarWeekDay: React.FC<CalendarWeekDayProps> = ({ day }) => {
  return (
    <section className="relative flex-grow w-full lg:w-auto lg:max-w-[25%] shrink-0 lg:shrink">
      <div className="sticky top-0 z-20 flex items-center py-3 mb-3 font-medium lg:mb-0 text-neutral-900 lg:static">
        <Button shape="circle" className="!rounded-md bg-white lg:hidden">
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
        <div className="flex-grow text-center lg:text-left">
          <span className="px-4 py-2 text-sm tracking-tight rounded-full sm:text-base text-neutral-700 bg-white/95 lg:p-0 lg:bg-transparent lg:rounded-none">
            {day}
          </span>
        </div>
        <Button shape="circle" className="!rounded-md bg-white lg:hidden">
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
      <div className="grid grid-cols-1 gap-3 p-px">
        <CalendarWeekDayEvent />
        <CalendarWeekDayEvent />
        <CalendarWeekDayEvent />
      </div>
    </section>
  );
};

export default CalendarWeekDay;
