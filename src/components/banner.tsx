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
    <div className="relative mb-10 overflow-hidden border-2 border-white rounded-md shadow group shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10">
      <Carousel ref={carouselRef} afterChange={onChange}>
        {orgBanners &&
          orgBanners.map((item, index) => (
            <Link
              to={item.link}
              className="relative inline-block overflow-hidden align-top rounded-[calc(0.375rem-0.125rem)] group/link"
              key={index}
            >
              <img
                src={item.img}
                alt={item.title}
                className="block object-cover object-center aspect-[7/3] w-full h-full rounded-[calc(0.375rem-0.125rem)] transition-opacity group-hover:opacity-90 duration-300"
                loading="lazy"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10 rounded-[calc(0.375rem-0.125rem)] duration-300 opacity-60 bg-gradient-to-b from-transparent to-black"
              ></div>
              {item.title && (
                <div className="absolute inset-0 top-auto z-20 grid p-16 place-content-center">
                  <div className="max-w-2xl mx-auto text-center">
                    <Balancer>
                      <h2 className="flex items-center justify-center font-bold text-center text-white text-4xl leading-[1.35] group-hover/link:underline underline-offset-4">
                        {item.title}
                      </h2>
                      <p className="mt-2.5 text-xl text-center text-white/90 line-clamp-4">
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
        className="absolute grid text-white transition-all bottom-0 rounded-md opacity-0 left-0 top-0 w-24 place-content-center duration-300 group-hover:opacity-75 group/button hover:!opacity-100"
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
        className="absolute grid text-white transition-all bottom-0 rounded-md opacity-0 right-0 top-0 w-24 place-content-center duration-300 group-hover:opacity-75 group/button hover:!opacity-100"
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
