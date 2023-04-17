import React from "react";
import CalendarWeekDay from "./day";
import { Select } from "antd";

const CalendarWeek: React.FC = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div className="mb-0.5 lg:pb-4 lg:mb-4 lg:flex lg:items-end lg:border-b lg:border-neutral-200">
        <h2 className="heading-lg">Adult and Child Lessons</h2>
        <div className="max-lg:overflow-x-auto max-lg:z-30 max-lg:bg-white/95 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:ml-auto max-lg:py-2.5 max-lg:border-t max-lg:border-black/10">
          <div className="container flex items-center gap-2 lg:gap-2.5 lg:p-0">
            <span className="hidden lg:block heading-sm">Filter</span>
            <Select
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
          </div>
        </div>
      </div>
      <div className="px-3 -mx-3 overflow-clip">
        <div className="flex w-full gap-3">
          <CalendarWeekDay day="Monday" />
          <CalendarWeekDay day="Tuesday" />
          <CalendarWeekDay day="Wednesday" />
          <CalendarWeekDay day="Thursday" />
          <CalendarWeekDay day="Friday" />
          <CalendarWeekDay day="Saturday" />
        </div>
      </div>
    </>
  );
};

export default CalendarWeek;
