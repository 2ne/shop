import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Collapse } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BasketItem } from "../types/types";
const { Panel } = Collapse;

export interface ShopLayoutProps {
  filters: boolean;
  title: string;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({
  filters: singleProduct,
  title,
}) => {
  const products: BasketItem[] = [
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Basic Tee",
      link: "/Tshirt",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      price: "£35.00",
      subTitle: "Black",
      limitedStock: true,
      outOfStock: true,
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Basic Tee",
      link: "#",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
      price: "£30.00",
      subTitle: "White",
      limitedStock: true,
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Basic Tee",
      link: "#",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
      price: "£30.00",
      subTitle: "Charcoal",
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Artwork Tee",
      link: "#",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
      price: "£35.00",
      subTitle: "Iso Dots",
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Zip Tote Basket",
      link: "#",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      price: "£140.00",
      subTitle: "White and black",
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Zip High Wall Tote",
      link: "#",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg",
      price: "£140.00",
      subTitle: "White and blue",
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "Halfsize Tote",
      link: "#",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg",
      price: "£140.00",
      subTitle: "Clay",
    },
    {
      id: Math.random().toString(36).substring(2, 15),
      title: "High Wall Tote",
      link: "#",
      image:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-04.jpg",
      price: "£140.00",
      subTitle: "Black and orange",
      outOfStock: true,
    },
  ];
  useEffect(() => {
    document.documentElement.classList.add("container-lg");

    return () => {
      document.documentElement.classList.remove("container-lg");
    };
  }, []);
  return (
    <>
      <div className="mb-6 lg:pb-3 lg:border-b lg:mb-10 lg:border-neutral-200">
        <h2 className="heading-lg">{title}</h2>
      </div>
      <div
        className={`lg:gap-7 lg:grid-cols-5 xl:grid-cols-6 ${
          singleProduct ? "block" : "lg:grid"
        }`}
      >
        {!singleProduct && (
          <div className="-mt-2.5 hidden lg:block">
            <div className="sticky z-10 top-2">
              <Collapse
                defaultActiveKey={["1"]}
                ghost
                bordered={false}
                className="select-none ant-collapse-calendar"
                expandIconPosition="end"
                expandIcon={({ isActive }) => (
                  <DownOutlined
                    className="!text-neutral-500"
                    rotate={isActive ? 180 : 0}
                  />
                )}
              >
                <Panel header="Products" key="1">
                  <Checkbox.Group className="space-y-1.5 block [&_.ant-checkbox]:shrink-0 [&_.ant-checkbox-wrapper]:flex [&_.ant-checkbox-wrapper>span]:min-w-0">
                    <Checkbox value="T Shirts">
                      <div className="truncate">T Shirts</div>
                    </Checkbox>
                    <Checkbox value="Tote Bags">
                      <div className="truncate">Tote Bags</div>
                    </Checkbox>
                  </Checkbox.Group>
                </Panel>
              </Collapse>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:col-span-4 xl:col-span-5 gap-x-6 gap-y-8 lg:gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              {product.limitedStock && !product.outOfStock && (
                <div className="absolute z-10 px-1.5 py-0.5 text-xs font-medium text-white rounded top-2 left-2 bg-amber-500">
                  Limited Stock
                </div>
              )}
              {product.outOfStock && (
                <div className="absolute z-10 px-1.5 py-0.5 text-xs font-medium text-white rounded top-2 left-2 bg-rose-500">
                  Out of Stock
                </div>
              )}
              <div
                className={`w-full overflow-hidden transition-colors border border-transparent border-solid rounded-md group-hover:border-neutral-200 group-hover:opacity-90 bg-neutral-100 ${
                  product.outOfStock ? "bg-rose-50" : ""
                }`}
              >
                <img
                  src={product.image}
                  className={`aspect-[3/2] transition-all mix-blend-multiply brightness-105 object-contain object-center h-full w-full group-hover:scale-[1.025] ${
                    product.outOfStock ? " grayscale " : ""
                  }`}
                />
              </div>
              <div className="flex justify-between mt-3">
                <div className="min-w-0">
                  <h3
                    className={`text-sm font-medium truncate group-hover:underline ${
                      product.outOfStock
                        ? "text-rose-600"
                        : product.limitedStock && !product.outOfStock
                        ? "text-amber-600"
                        : "text-neutral-900"
                    }`}
                  >
                    <Link to={product.link}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                </div>
                <p
                  className={`pl-3 text-sm font-medium ${
                    product.outOfStock
                      ? "text-rose-600"
                      : product.limitedStock && !product.outOfStock
                      ? "text-amber-600"
                      : "text-neutral-900"
                  }`}
                >
                  {product.price}
                </p>
              </div>
              <p className="mt-0.5 text-sm truncate text-neutral-500">
                {product.subTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopLayout;
