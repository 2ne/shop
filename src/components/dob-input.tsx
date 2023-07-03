import React, { useState, useRef, useEffect } from "react";
import { differenceInYears, startOfDay } from "date-fns";
import { Input, InputRef, Form } from "antd";

interface DateOfBirthInputProps {
  onDateChange: (
    day: string,
    month: string,
    year: string,
    age: number | null
  ) => void;
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({
  onDateChange,
}) => {
  const [bdayDay, setBdayDay] = useState("");
  const [bdayMonth, setBdayMonth] = useState("");
  const [bdayYear, setBdayYear] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const inputDayEl = useRef<InputRef>(null);
  const inputMonthEl = useRef<InputRef>(null);
  const inputYearEl = useRef<InputRef>(null);

  useEffect(() => {
    calculateAge();
  }, [bdayDay, bdayMonth, bdayYear]);

  const switchInputFocus = (
    value: string,
    currentRef: React.RefObject<InputRef>,
    nextRef: React.RefObject<InputRef>
  ) => {
    if (value !== "00" && value.length > 1 && nextRef.current?.input) {
      nextRef.current.input.focus();
    }
  };

  const calculateAge = () => {
    if (
      bdayDay &&
      bdayDay !== "00" &&
      bdayMonth &&
      bdayMonth !== "00" &&
      bdayYear.length === 4 &&
      bdayYear !== "0000"
    ) {
      const today = startOfDay(new Date());
      const birthDate = new Date(
        parseInt(bdayYear),
        parseInt(bdayMonth) - 1,
        parseInt(bdayDay)
      );
      const calculatedAge = differenceInYears(today, birthDate);
      setAge(calculatedAge);
      onDateChange(bdayDay, bdayMonth, bdayYear, calculatedAge);
    } else {
      setAge(null);
      onDateChange(bdayDay, bdayMonth, bdayYear, null);
    }
  };

  const getYearShortcut = () => {
    const thisYear = new Date().getFullYear() % 100;
    const thisCentury = Math.floor(thisYear / 10) * 10;
    const previousCentury = Math.floor(thisYear / 10) * 10 - 1;

    if (bdayYear !== "0000" && bdayYear.length === 2) {
      if (Number(bdayYear) > thisYear) {
        setBdayYear(String(previousCentury + Number(bdayYear)));
      } else {
        setBdayYear(String(thisCentury + Number(bdayYear)));
      }
    }
  };

  return (
    <Form.Item
      label={
        <>
          Date of birth
          {age !== null && (
            <span className="text-gray-500">
              <span>
                <span className="mx-1">·</span>
                {age} year
              </span>
              <span>{age > 1 ? "s" : ""}</span>
              <span> old</span>
            </span>
          )}
        </>
      }
      extra="Example · 30/04/1970"
    >
      <div className="grid grid-cols-3">
        <Input
          ref={inputDayEl}
          aria-label="Day"
          id="bday-day"
          name="bday-day"
          autoComplete="bday-day"
          type="text"
          inputMode="numeric"
          maxLength={2}
          className="block w-full rounded-l-md hover:z-10 !rounded-r-none border-gray-300 focus:z-20 even:-ml-px last:ml-[-2px] last:w-[calc(100%+2px)] placeholder:text-gray-400 tabular-nums"
          placeholder="DD"
          value={bdayDay}
          onChange={(e) => {
            setBdayDay(e.target.value);
            switchInputFocus(e.target.value, inputDayEl, inputMonthEl);
          }}
        />
        <Input
          ref={inputMonthEl}
          aria-label="Month"
          id="bday-month"
          name="bday-month"
          autoComplete="bday-month"
          type="text"
          inputMode="numeric"
          maxLength={2}
          className="block w-full border-gray-300 hover:z-10 focus:z-20 even:-ml-px last:ml-[-2px] last:w-[calc(100%+2px)] placeholder:text-gray-400 tabular-nums !rounded-none"
          placeholder="MM"
          value={bdayMonth}
          onChange={(e) => {
            setBdayMonth(e.target.value);
            switchInputFocus(e.target.value, inputMonthEl, inputYearEl);
          }}
        />
        <Input
          ref={inputYearEl}
          aria-label="Year"
          id="bday-year"
          name="bday-year"
          autoComplete="bday-year"
          type="text"
          inputMode="numeric"
          maxLength={4}
          className="block w-full rounded-r-md hover:z-10 !rounded-l-none border-gray-300 focus:z-20 even:-ml-px last:ml-[-2px] last:w-[calc(100%+2px)] placeholder:text-gray-400 tabular-nums"
          placeholder="YYYY"
          value={bdayYear}
          onBlur={() => getYearShortcut()}
          onChange={(e) => {
            setBdayYear(e.target.value);
          }}
        />
      </div>
    </Form.Item>
  );
};

export default DateOfBirthInput;
