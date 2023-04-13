import React from "react";
import { Link } from "react-router-dom";

interface TileItem {
  label: string;
  link: string;
  image: string;
}

interface TileProps {
  items?: TileItem[];
}

const Tiles: React.FC<TileProps> = ({ items }) => {
  return (
    <>
      {items && (
        <div className="grid gap-3 sm:gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_max-content))] lg:grid-cols-[repeat(auto-fit,_minmax(300px,_max-content))]">
          {items.map((item, index) => (
            <Link
              to={item.link}
              className="md:max-w-[33vw] p-0.5 grid bg-white rounded-md shadow-lg shadow-slate-900/10 ring-1 ring-slate-600 ring-opacity-5 transition-transform origin-bottom hover:scale-[1.015]"
              key={index}
            >
              <img
                src={item.image}
                alt={item.label + " Logo"}
                className="block rounded-t-[calc(0.375rem-0.125rem)] aspect-[3/2] object-cover"
                loading="lazy"
              />
              <div className="relative px-3 py-2.5 bg-white">
                <h2 className="leading-5 tracking-tight text-center sm:text-lg font-display line-clamp-2 text-primary_text">
                  {item.label}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Tiles;
