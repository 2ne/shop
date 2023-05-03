import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { orgBanners } from "../org";
import Balancer from "react-wrap-balancer";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";

const Banner: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className="relative mb-5 overflow-hidden border-2 border-white rounded-md shadow group shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10">
      <Carousel ref={carouselRef} afterChange={onChange}>
        {orgBanners &&
          orgBanners.map((item, index) => (
            <Link
              to={item.link}
              className="relative inline-block overflow-hidden align-top rounded-[calc(0.375rem-0.125rem)]"
              key={index}
            >
              <img
                src={item.img}
                alt={item.title}
                className="block object-cover object-center aspect-[7/3] rounded-[calc(0.375rem-0.125rem)] transition-opacity group-hover:opacity-90 duration-300"
                loading="lazy"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 rounded-[calc(0.375rem-0.125rem)] duration-300 opacity-[.55] bg-gradient-to-b from-transparent to-black"
              ></div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 z-20 p-16">
                  <div className="max-w-2xl mx-auto text-center">
                    <Balancer>
                      <h2 className="flex items-center justify-center text-4xl font-bold leading-relaxed text-center text-white">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xl text-center text-white/90 line-clamp-3">
                        {item.description}
                      </p>
                    </Balancer>
                  </div>
                </div>
              )}
            </Link>
          ))}
      </Carousel>
      <button
        onClick={handlePrev}
        type="button"
        className="absolute grid text-white transition-all -translate-y-1/2 rounded-full opacity-0 left-4 top-1/2 h-14 w-14 place-content-center duration-300 group-hover:opacity-75 group/button hover:!opacity-100"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="w-8 h-8 transition-all duration-300 group-hover/button:-translate-x-1"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.75"
            d="M10.25 6.75L4.75 12L10.25 17.25"
          ></path>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19.25 12H5"
          ></path>
        </svg>
      </button>
      <button
        onClick={handleNext}
        type="button"
        className="absolute grid text-white transition-all -translate-y-1/2 rounded-full opacity-0 right-4 top-1/2 h-14 w-14 place-content-center duration-300 group-hover:opacity-75 group/button hover:!opacity-100"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="w-8 h-8 transition-all duration-300 group-hover/button:translate-x-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13.75 6.75l5.5 5.25-5.5 5.25M19 12H4.75"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Banner;
