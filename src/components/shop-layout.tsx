import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Collapse } from "antd";
import React, { useEffect } from "react";
const { Panel } = Collapse;

export interface ShopLayoutProps {
  singleProduct: boolean;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({ singleProduct }) => {
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "£35.00",
      description: "Black",
      limitedStock: true,
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
      imageAlt: "Front of men's Basic Tee in white.",
      price: "£30.00",
      description: "White",
      outOfStock: true,
    },
    {
      id: 3,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "£30.00",
      description: "Charcoal",
    },
    {
      id: 4,
      name: "Artwork Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
      imageAlt: "Front of men's Basic Tee in black.",
      price: "£35.00",
      description: "Iso Dots",
    },
    {
      id: 5,
      name: "Zip Tote Basket",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
      price: "£140.00",
      description: "White and black",
    },
    {
      id: 6,
      name: "Zip High Wall Tote",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg",
      price: "£140.00",
      description: "White and blue",
    },
    {
      id: 7,
      name: "Halfsize Tote",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg",
      price: "£140.00",
      description: "Clay",
    },
    {
      id: 8,
      name: "High Wall Tote",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-04.jpg",
      price: "£140.00",
      description: "Black and orange",
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
      <div className="pb-3 mb-10 border-b border-neutral-200">
        <h2 className="heading-lg">Shop</h2>
      </div>
      <div className="hidden lg:gap-6 lg:grid lg:grid-cols-5 xl:grid-cols-6">
        {!singleProduct && (
          <div className="-mt-1.5">
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
        <div className="grid grid-cols-1 lg:col-span-4 xl:col-span-5 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              {product.limitedStock && (
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
                  src={product.imageSrc}
                  className={`aspect-[3/2] mix-blend-multiply brightness-105 object-contain object-center h-full w-full group-hover:scale-[1.025] ${
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
                        : product.limitedStock
                        ? "text-amber-600"
                        : "text-neutral-900"
                    }`}
                  >
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
                <p
                  className={`pl-3 text-sm font-medium ${
                    product.outOfStock
                      ? "text-rose-600"
                      : product.limitedStock
                      ? "text-amber-600"
                      : "text-neutral-900"
                  }`}
                >
                  {product.price}
                </p>
              </div>
              <p className="mt-0.5 text-sm truncate text-neutral-500">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopLayout;
