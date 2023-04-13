import React from "react";
import CalendarWeekDay from "./day";

const CalendarWeek: React.FC = () => {
  return (
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
  );
};

export default CalendarWeek;
