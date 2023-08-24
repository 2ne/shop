import React, { useState, useRef, useEffect } from "react";
import { differenceInYears, startOfDay } from "date-fns";
import { Input, InputRef } from "antd";

interface DateOfBirthInputProps {
  onChange: (data: {
    age: number | null;
    dob: Date | null;
    day: string;
    month: string;
    year: string;
  }) => void;
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({ onChange }) => {
  const [bdayDay, setBdayDay] = useState("");
  const [bdayMonth, setBdayMonth] = useState("");
  const [bdayYear, setBdayYear] = useState("");

  const inputDayEl = useRef<InputRef | null>(null);
  const inputMonthEl = useRef<InputRef | null>(null);
  const inputYearEl = useRef<InputRef | null>(null);

  const inputs = [
    {
      ref: inputDayEl,
      id: "bday-day",
      setter: setBdayDay,
      nextRef: inputMonthEl,
      maxLength: 2,
      placeholder: "DD",
      value: bdayDay,
    },
    {
      ref: inputMonthEl,
      id: "bday-month",
      setter: setBdayMonth,
      nextRef: inputYearEl,
      maxLength: 2,
      placeholder: "MM",
      value: bdayMonth,
    },
    {
      ref: inputYearEl,
      id: "bday-year",
      setter: setBdayYear,
      maxLength: 4,
      placeholder: "YYYY",
      value: bdayYear,
    },
  ];

  const createDate = (
    day: string,
    month: string,
    year: string
  ): Date | null => {
    if (
      day &&
      day !== "00" &&
      month &&
      month !== "00" &&
      year &&
      year.length === 4 &&
      year !== "0000"
    ) {
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return null;
  };

  const calculateAge = () => {
    const birthDate = createDate(bdayDay, bdayMonth, bdayYear);
    const today = startOfDay(new Date());
    const calculatedAge = birthDate
      ? differenceInYears(today, birthDate)
      : null;

    if (onChange) {
      onChange({
        age: calculatedAge,
        dob: birthDate,
        day: bdayDay,
        month: bdayMonth,
        year: bdayYear,
      });
    }
  };

  useEffect(() => {
    if (bdayDay && bdayMonth && bdayYear) {
      calculateAge();
    }
  }, [bdayDay, bdayMonth, bdayYear]);

  const switchInputFocus = (
    value: string,
    setState: (value: string) => void,
    currentRef: React.RefObject<InputRef>,
    nextRef?: React.RefObject<InputRef>
  ) => {
    setState(value);
    if (value.length === 2 && nextRef?.current?.input) {
      nextRef.current.input.focus();
    }

    calculateAge();
  };

  const getYearShortcut = () => {
    const thisYear = new Date().getFullYear() % 100;
    const thisCentury = Math.floor(thisYear / 10) * 10;
    const previousCentury = thisCentury - 100;

    if (bdayYear && bdayYear.length === 2) {
      const year = Number(bdayYear) > thisYear ? previousCentury : thisCentury;
      setBdayYear(String(year + Number(bdayYear)));
    }
  };

  return (
    <>
      {inputs.map(
        ({ ref, id, setter, nextRef, maxLength, placeholder, value }, idx) => (
          <Input
            key={id}
            ref={ref}
            aria-label={placeholder}
            id={id}
            name={id}
            autoComplete={id}
            type="text"
            inputMode="numeric"
            maxLength={maxLength}
            className={`block w-full border-gray-300 hover:z-10 focus:z-20 even:-ml-px last:ml-[-2px] last:w-[calc(100%+2px)] placeholder:text-gray-400 tabular-nums ${
              idx === 0
                ? "rounded-l-md !rounded-r-none"
                : idx === 2
                ? "rounded-r-md !rounded-l-none"
                : "!rounded-none"
            }`}
            placeholder={placeholder}
            value={value}
            onBlur={idx === 2 ? getYearShortcut : undefined}
            onChange={(e) =>
              switchInputFocus(e.target.value, setter, ref, nextRef)
            }
          />
        )
      )}
    </>
  );
};

export default DateOfBirthInput;
