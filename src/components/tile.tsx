import React from "react";
import { Link } from "react-router-dom";
import { orgTiles } from "../org";

const Tiles: React.FC = () => {
  return (
    <>
      {orgTiles && (
        <div className="grid gap-3 sm:gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_max-content))] lg:grid-cols-[repeat(auto-fit,_minmax(300px,_max-content))]">
          {orgTiles.map((item, index) => (
            <Link
              to={item.link}
              className="md:max-w-[33vw] p-0.5 grid card"
              key={index}
            >
              <img
                src={item.img}
                alt={item.title}
                className={`block object-contain ${
                  item.title
                    ? "rounded-t-[calc(0.375rem-0.125rem)]"
                    : "rounded-[calc(0.375rem-0.125rem)]"
                }`}
                loading="lazy"
              />
              {item.title && (
                <div className="relative px-3 py-2.5 bg-white">
                  <h2 className="font-semibold leading-5 text-center line-clamp-2 text-neutral-800">
                    {item.title}
                  </h2>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Tiles;
