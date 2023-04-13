import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import { Button, Radio } from "antd";

function BubbleTheSeahorse(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
    { label: "Bubble the Seahorse", link: "/BubbleTheSeahorse" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="space-y-5 sm:space-y-9">
        <div className="space-y-1.5 sm:space-y-0 border-b border-neutral-200 pb-4">
          <h2 className="font-semibold leading-5 sm:text-lg text-neutral-800">
            Bubble the Seahorse
          </h2>
          <h3 className="text-sm font-medium text-gray-500 sm:text-base">
            Every Tuesday at 11:30 - 12:00
          </h3>
        </div>
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              className="rounded-md aspect-[3/2] object-cover"
              loading="lazy"
            />
          </div>
          <div className="space-y-6 sm:space-y-10">
            <section>
              <div className="mb-2 -mt-2 text-sm font-medium text-gray-900 sm:mb-3 sm:text-base">
                Purchase options
              </div>
              <div>
                <Radio.Group
                  defaultValue="a"
                  size="large"
                  className="flex w-full gap-3 sm:gap-4"
                >
                  <Radio.Button
                    value="a"
                    className="w-full !h-auto !rounded-md before:!hidden !border !leading-4 flex items-center py-4 sm:py-5 px-3 sm:px-4"
                  >
                    <div className="text-sm font-medium text-gray-900 sm:text-base">
                      Session · £16.00
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500 sm:text-sm font-normal">
                      Every Tuesday
                      <span className="hidden lg:inline">
                        {" "}
                        at 11:30 - 12:00
                      </span>
                    </div>
                  </Radio.Button>
                  <Radio.Button
                    value="b"
                    className="w-full !h-auto !rounded-md before:!hidden !border !leading-4 flex items-center py-4 sm:py-5 px-3 sm:px-4"
                  >
                    <div className="text-sm font-medium text-gray-900 sm:text-base">
                      Trial · £5.00
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500 sm:text-sm font-normal">
                      Single session
                      <span className="hidden lg:inline"> on a Tuesday</span>
                    </div>
                  </Radio.Button>
                </Radio.Group>
              </div>
            </section>
            <section>
              <div className="mb-2 -mt-1 text-sm font-medium text-gray-900 sm:mb-3 sm:text-base">
                Select a date
              </div>
              <div>
                <Radio.Group
                  size="large"
                  defaultValue="date-1"
                  className="grid w-full grid-cols-3 gap-3 sm:gap-4 sm:grid-cols-4"
                >
                  <Radio.Button
                    value="date-1"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    4th April
                  </Radio.Button>
                  <Radio.Button
                    value="date-2"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    11th April
                  </Radio.Button>
                  <Radio.Button
                    value="date-3"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    18th April
                  </Radio.Button>
                  <Radio.Button
                    value="date-4"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    25th April
                  </Radio.Button>
                  <Radio.Button
                    value="date-5"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                    disabled
                  >
                    2nd May
                  </Radio.Button>
                  <Radio.Button
                    value="date-6"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                    disabled
                  >
                    9th May
                  </Radio.Button>
                  <Radio.Button
                    value="date-7"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    16th May
                  </Radio.Button>
                  <Radio.Button
                    value="date-8"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    23rd May
                  </Radio.Button>
                  <Radio.Button
                    value="date-9"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    30th May
                  </Radio.Button>
                  <Radio.Button
                    value="date-10"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    4th June
                  </Radio.Button>
                  <Radio.Button
                    value="date-11"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    11th June
                  </Radio.Button>
                  <Button
                    size="large"
                    className="w-full !rounded-md before:!hidden !border flex justify-center items-center !text-sm"
                  >
                    More <div className="hidden ml-1 md:inline">dates</div>...
                  </Button>
                </Radio.Group>
              </div>
            </section>
            <section className="space-y-4">
              <Button size="large" type="primary" block className="!h-12">
                Add to basket
              </Button>
              <div className="flex justify-center">
                <div className="px-4 py-1.5 text-sm text-neutral-800 rounded-full bg-neutral-100">
                  Estimated monthly total{" "}
                  <span className="font-medium text-neutral-900">£64.00</span>
                </div>
              </div>
            </section>
            <section className="space-y-4">
              <div className="pb-2 text-sm font-medium text-gray-900 border-b sm:mb-3 sm:text-base border-neutral-200">
                Details
              </div>
            </section>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default BubbleTheSeahorse;
