import React from "react";
import { Link } from "react-router-dom";
import { Event } from "../../org";

interface CalendarEventProps {
  key: string;
  activeDay: string;
  index: number;
  event: Event;
}

const colourClasses = {
  red: "bg-red-50 shadow shadow-red-900/5 ring-opacity-10 ring-1 ring-red-800",
  orange:
    "bg-orange-50 shadow shadow-orange-900/5 ring-opacity-10 ring-1 ring-orange-800",
  amber:
    "bg-amber-50 shadow shadow-amber-900/5 ring-opacity-10 ring-1 ring-amber-800",
  yellow:
    "bg-yellow-50 shadow shadow-yellow-900/5 ring-opacity-10 ring-1 ring-yellow-800",
  lime: "bg-lime-50 shadow shadow-lime-900/5 ring-opacity-10 ring-1 ring-lime-800",
  green:
    "bg-green-50 shadow shadow-green-900/5 ring-opacity-10 ring-1 ring-green-800",
  emerald:
    "bg-emerald-50 shadow shadow-emerald-900/5 ring-opacity-10 ring-1 ring-emerald-800",
  teal: "bg-teal-50 shadow shadow-teal-900/5 ring-opacity-10 ring-1 ring-teal-800",
  cyan: "bg-cyan-50 shadow shadow-cyan-900/5 ring-opacity-10 ring-1 ring-cyan-800",
  sky: "bg-sky-50 shadow shadow-sky-900/5 ring-opacity-10 ring-1 ring-sky-800",
  blue: "bg-blue-50 shadow shadow-blue-900/5 ring-opacity-10 ring-1 ring-blue-800",
  indigo:
    "bg-indigo-50 shadow shadow-indigo-900/5 ring-opacity-10 ring-1 ring-indigo-800",
  violet:
    "bg-violet-50 shadow shadow-violet-900/5 ring-opacity-10 ring-1 ring-violet-800",
  purple:
    "bg-purple-50 shadow shadow-purple-900/5 ring-opacity-10 ring-1 ring-purple-800",
  fuchsia:
    "bg-fuchsia-50 shadow shadow-fuchsia-900/5 ring-opacity-10 ring-1 ring-fuchsia-800",
  pink: "bg-pink-50 shadow shadow-pink-900/5 ring-opacity-10 ring-1 ring-pink-800",
  rose: "bg-rose-50 shadow shadow-rose-900/5 ring-opacity-10 ring-1 ring-rose-800",
  stone:
    "bg-stone-50 shadow shadow-stone-900/5 ring-opacity-10 ring-1 ring-stone-800",
};

const textColourClasses = {
  red: "text-red-800",
  orange: "text-orange-800",
  amber: "text-amber-800",
  yellow: "text-yellow-800",
  lime: "text-lime-800",
  green: "text-green-800",
  emerald: "text-emerald-800",
  teal: "text-teal-800",
  cyan: "text-cyan-800",
  sky: "text-sky-800",
  blue: "text-blue-800",
  indigo: "text-indigo-800",
  violet: "text-violet-800",
  purple: "text-purple-800",
  fuchsia: "text-fuchsia-800",
  pink: "text-pink-800",
  rose: "text-rose-800",
  stone: "text-stone-800",
};

const CalendarEvent: React.FC<CalendarEventProps> = ({
  activeDay,
  index,
  event,
}) => {
  const colourClass = event.colour ? colourClasses[event.colour] : "";
  const textColourClass = event.colour ? textColourClasses[event.colour] : "";

  return (
    <Link
      key={`${activeDay}-event-${index}`}
      to={event.link}
      className={`@container block px-0.5 text-sm card max-lg:grid gap-1 sm:gap-4 max-sm:grid-cols-3 max-lg:grid-cols-3 max-lg:items-center ${colourClass}`}
    >
      {!event.hideImage && (
        <img
          className={`mt-0.5 max-lg:mb-0.5 max-lg:h-full aspect-[3/2] object-cover object-center mx-auto max-lg:col-span-1 max-lg:rounded-l-[calc(0.375rem-0.125rem)] lg:rounded-t-[calc(0.375rem-0.125rem)] ${
            event.colour ? " mix-blend-multiply brightness-105 " : " "
          }`}
          src={event.img}
        />
      )}
      <div
        className={`py-1 px-2 space-y-1 lg:mb-px max-lg:col-span-2 ${textColourClass}`}
      >
        <h3 className={`mb-1 heading-sm truncate ${textColourClass}`}>
          {event.title}
        </h3>
        <div className="flex items-center gap-1">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5 -ml-1 opacity-70 shrink-0 hidden @[130px]:block"
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
          <span className="">{event.startTime}</span>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5 -mx-1.5 opacity-70 shrink-0"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
          <span className="truncate">{event.endTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="w-5 h-5 -ml-1 opacity-70 shrink-0 hidden @[130px]:block"
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
            className="w-5 h-5 -ml-1 opacity-70 shrink-0 hidden @[130px]:block"
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
            <g transform="scale(0.45) translate(14 14)">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M17.25 8.25v-1.5a2 2 0 00-2-2h-3.5c-1.105 0-2 .893-2 1.998V14c0 3-3 5.25-3 5.25h8.5a2 2 0 002-2v-.5M6.75 11.75h6.5"
              ></path>
            </g>
          </svg>
          <span>{event.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default CalendarEvent;
