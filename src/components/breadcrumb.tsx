import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "./wrapper";

interface BreadcrumbItem {
  label?: string;
  link?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Wrapper className="bg-secondary text-secondary_text !p-0">
      <nav className="overflow-hidden text-sm">
        <ol
          role="list"
          className="flex items-center h-10 px-3 space-x-0.5 overflow-x-auto"
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
                    <div className="flex items-center opacity-75 gap-x-0.5">
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                      </svg>
                      {item.label && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-0.5">
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                      </svg>
                      {item.link && item.label && (
                        <Link className="truncate" to={item.link}>
                          {item.label}
                        </Link>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </>
          )}
        </ol>
      </nav>
    </Wrapper>
  );
};

export default Breadcrumb;
