import React, { useState, useRef, useEffect } from "react";
import { differenceInYears, startOfDay } from "date-fns";
import { Input, InputRef } from "antd";

interface DateOfBirthInputProps {
  setAge: any;
  dateOfBirth: any;
  onChange: (data: {
    age: number | null;
    dob: Date | null;
    day: string;
    month: string;
    year: string;
  }) => void;
  isDayInvalid: boolean;
  isMonthInvalid: boolean;
  isYearInvalid: boolean;
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({
  setAge,
  dateOfBirth,
  onChange,
  isDayInvalid,
  isMonthInvalid,
  isYearInvalid,
}) => {
  const [bdayDay, setBdayDay] = useState("");
  const [bdayMonth, setBdayMonth] = useState("");
  const [bdayYear, setBdayYear] = useState("");

  console.log("bdayDay", bdayDay, "bdayMonth", bdayMonth);
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
    const birthDate = createDate(
      dateOfBirth.day,
      dateOfBirth.month,
      dateOfBirth.year
    );
    console.log("birth date", birthDate);
    const today = startOfDay(new Date());
    const calculatedAge = birthDate
      ? differenceInYears(today, birthDate)
      : null;

    setAge(calculatedAge);
  };

  useEffect(() => {
    calculateAge();
  }, [dateOfBirth.day, dateOfBirth.month, dateOfBirth.year]);

  const switchInputFocus = (
    id: string,
    value: string,
    setState: (value: string) => void,
    currentRef: React.RefObject<InputRef>,
    nextRef?: React.RefObject<InputRef>
  ) => {
    if (id === "bday-day") {
      const updatedValue = {
        ...dateOfBirth,
        day: value,
      };
      onChange(updatedValue);
    }

    if (id === "bday-month") {
      const updatedValue = {
        ...dateOfBirth,
        month: value,
      };
      onChange(updatedValue);
    }

    if (id === "bday-year") {
      const updatedValue = {
        ...dateOfBirth,
        year: value,
      };
      onChange(updatedValue);
    }

    setState(value);

    console.log("tyoe of", typeof value);

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
            className={`block w-full 
            
            ${
              id === "bday-day" && isDayInvalid
                ? `border-[red] hover:border-[red] focus:border-[red]`
                : ""
            } ${isDayInvalid && id == "bday-month" ? "border-s-[red]" : ""} 

            ${
              id === "bday-month" && isMonthInvalid
                ? `border-[red] hover:border-[red] focus:border-[red]`
                : ""
            } ${isMonthInvalid && id == "bday-year" ? "border-s-[red]" : ""}  

            ${
              id === "bday-year" && isYearInvalid
                ? `border-[red] hover:border-[red] focus:border-[red]`
                : ""
            } ${isYearInvalid && id == "bday-month" ? "border-e-[red]" : ""}  
            
            hover:z-10 focus:z-20 even:-ml-px last:ml-[-2px] last:w-[calc(100%+2px)] placeholder:text-gray-400 tabular-nums ${
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
              switchInputFocus(id, e.target.value, setter, ref, nextRef)
            }
          />
        )
      )}
    </>
  );
};

export default DateOfBirthInput;
