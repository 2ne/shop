import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label?: string;
  link?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="bg-secondary text-secondary_text">
      <nav className="w-full mx-auto overflow-hidden text-sm max-w-screen-2xl">
        <ol
          role="list"
          className="flex items-center h-10 px-3 space-x-1 overflow-x-auto"
        >
          <li>
            <div className="flex items-center">
              <a href="/Home" className="truncate">
                Home
              </a>
            </div>
          </li>
          {items && (
            <>
              {items.map((item, index) => (
                <li key={item.label}>
                  {index === items.length - 1 ? (
                    <div className="flex items-center opacity-75 gap-x-1">
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                      </svg>
                      <span className="truncate">{item.label}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-1">
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                      </svg>
                      <Link className="truncate" to={item.link}>
                        {item.label}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
