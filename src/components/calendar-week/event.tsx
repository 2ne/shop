import React from "react";
import { Link } from "react-router-dom";

const CalendarWeekDayEvent: React.FC = () => {
  return (
    <Link
      to="/BubbleTheSeahorse"
      className="p-3 text-sm bg-white rounded-md shadow shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10 lg:transition-transform lg:origin-bottom lg:hover:scale-[1.015]"
    >
      <img
        className="aspect-[3/2] object-cover mx-auto"
        src="https://app.joinin.online/services/anonymous/photo/8b0f7a97-c07e-4fd3-ae37-f2fcc6ebff18"
      />
      <div className="space-y-0.5">
        <h3 className="mb-1.5 heading-sm">Smiley the Turtle</h3>
        <div className="flex items-center gap-1">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="-ml-1 text-neutral-500"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M18.25 11C18.25 15 12 19.25 12 19.25C12 19.25 5.75 15 5.75 11C5.75 7.5 8.68629 4.75 12 4.75C15.3137 4.75 18.25 7.5 18.25 11Z"
            ></path>
            <circle
              cx="12"
              cy="11"
              r="2.25"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            ></circle>
          </svg>
          <span>Little Thetford</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="-ml-1 text-neutral-500"
          >
            <circle
              cx="12"
              cy="12"
              r="7.25"
              stroke="currentColor"
              stroke-width="1.5"
            ></circle>
            <path
              stroke="currentColor"
              stroke-width="1.5"
              d="M12 8V12L14 14"
            ></path>
          </svg>

          <span>09:30</span>
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
          <span>10:00</span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="-ml-1 text-neutral-500"
          >
            <circle
              cx="12"
              cy="12"
              r="7.25"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            ></circle>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 7.75V8.25"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 15.75V16.25"
            ></path>
          </svg>
          <span>£16.00</span>
        </div>
      </div>
    </Link>
  );
};

export default CalendarWeekDayEvent;
