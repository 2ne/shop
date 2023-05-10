import React from "react";
import { Link } from "react-router-dom";
import { Event } from "../../org";

interface CalendarEventProps {
  key: string;
  activeDay: string;
  index: number;
  event: Event;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  activeDay,
  index,
  event,
}) => {
  return (
    <Link
      key={`${activeDay}-event-${index}`}
      to={event.link}
      className="block p-0.5 text-sm card max-lg:grid max-lg:gap-4 max-sm:grid-cols-4 max-lg:grid-cols-3 max-lg:items-center"
    >
      <img
        className="aspect-[3/2] object-cover object-center mx-auto max-lg:col-span-1 rounded-t-[calc(0.375rem-0.125rem)]"
        src={event.img}
      />
      <div className="py-2.5 p-3 space-y-0.5 max-sm:col-span-3 max-lg:col-span-2">
        <h3 className="mb-1.5 heading-sm truncate">{event.title}</h3>
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
  );
};

export default CalendarEvent;
