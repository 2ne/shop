import React from "react";

const Breadcrumb: React.FC = () => {
  return (
    <div className="bg-secondary text-secondary_text">
      <nav className="w-full mx-auto overflow-hidden text-sm max-w-screen-2xl">
        <ol
          role="list"
          className="flex items-center h-10 px-3 space-x-1 overflow-x-auto"
        >
          <li>
            <div className="flex items-center">
              <a href="#" className="truncate">
                Home
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-1">
              <svg
                className="flex-shrink-0 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
              </svg>
              <a href="#" className="truncate">
                Adult and Child Lessons
              </a>
            </div>
          </li>
          <li className="opacity-75">
            <div className="flex items-center gap-x-1">
              <svg
                className="flex-shrink-0 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
              </svg>
              <a href="#" className="truncate">
                Bubble the Seahorse
              </a>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
