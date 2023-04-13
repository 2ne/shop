import React from "react";

interface TileItem {
  label?: string;
  image?: string;
}

interface TileProps {
  items?: TileItem[];
}

const Tile: React.FC<TileProps> = ({ items }) => {
  return (
    <>
      {items && (
        <>
          {items.map((item, index) => (
            <div className="flex" key={index}>
              <img
                src={item.image}
                alt={item.label + " Logo"}
                className="block"
                loading="lazy"
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Tile;
