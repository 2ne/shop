import { ReactElement, useEffect, useState } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import { Button, Radio } from "antd";
import { useBasketContext } from "../components/basket/basket-context";

function BubbleTheSeahorse(): ReactElement {
  const [basketIsClicked, setBasketIsClicked] = useState(false);

  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
    { label: "Bubble the Seahorse", link: "/BubbleTheSeahorse" },
  ];

  const { openBasket, isOpen, addItem } = useBasketContext();

  const sampleItem = {
    id: Math.random().toString(36).substring(2, 15),
    image:
      "https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    title: "Bubble the Seahorse",
    subTitle: "Every Tuesday at 11:30 - 12:00",
    dates: "4th April - 25th April",
    price: "£16.00",
    cost: "£64.00",
    billing: "Monthly on the 1st",
    requiredProduct: {
      id: Math.random().toString(36).substring(2, 15),
      image:
        "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      dates: "April 2023 - April 2024",
      title: "Swimming Membership",
      subTitle: "12 months",
      cost: "£20.00",
      billing: "Monthly on the 1st",
    },
  };

  const handleBasketClick = () => {
    setBasketIsClicked(true);

    setTimeout(() => {
      setBasketIsClicked(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isOpen) {
      setBasketIsClicked(false);
    }
  }, [isOpen]);

  const addToBasketAndOpen = () => {
    handleBasketClick();
    addItem(sampleItem);
    openBasket();
  };

  const basketButtonClasses =
    basketIsClicked && "pointer-events-none !bg-emerald-600";

  const basketButtonText = basketIsClicked ? "Added" : "Add to basket";

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-24 space-y-4 sm:space-y-8">
        <div className="sticky top-0 space-y-0.5 py-3 border-b sm:space-y-0 border-neutral-200 bg-white/95 z-20 -mt-3">
          <h2 className="heading-lg">Bubble the Seahorse</h2>
          <h3 className="sub-heading">Every Tuesday at 11:30 - 12:00</h3>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:grid sm:gap-10 lg:grid-cols-2">
          <div className="grid rounded-md lg:sticky lg:top-28 place-items-center self-start aspect-[3/2] bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              className="rounded-md aspect-[3/2] object-contain h-full w-full"
              loading="lazy"
              alt="Product illustration"
            />
          </div>
          <div className="space-y-6 sm:space-y-10">
            <section className="sm:-mt-1.5">
              <div className="mb-2 sm:mb-3 heading">Purchase options</div>
              <div>
                <Radio.Group
                  defaultValue="a"
                  size="large"
                  className="flex w-full gap-2 px-px sm:gap-4"
                >
                  <Radio.Button value="a" className="radio-button-xl">
                    <div className="heading">Session · £16.00</div>
                    <div className="mt-0.5 sub-heading-xs">
                      Every Tuesday
                      <span className="hidden lg:inline">
                        {" "}
                        at 11:30 - 12:00
                      </span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="b" className="radio-button-xl">
                    <div className="heading">Trial · £5.00</div>
                    <div className="mt-0.5 sub-heading-xs">
                      Single session
                      <span className="hidden lg:inline"> on a Tuesday</span>
                    </div>
                  </Radio.Button>
                </Radio.Group>
              </div>
            </section>
            <section>
              <div className="mb-2 sm:mb-3 heading">Select a date</div>
              <div>
                <Radio.Group
                  size="large"
                  defaultValue="date-1"
                  className="grid w-full grid-cols-3 gap-2 px-px sm:gap-4 sm:grid-cols-4"
                >
                  <Radio.Button value="date-1" className="radio-button-lg">
                    4th April
                  </Radio.Button>
                  <Radio.Button value="date-2" className="radio-button-lg">
                    11th April
                  </Radio.Button>
                  <Radio.Button value="date-3" className="radio-button-lg">
                    18th April
                  </Radio.Button>
                  <Radio.Button value="date-4" className="radio-button-lg">
                    25th April
                  </Radio.Button>
                  <Radio.Button
                    value="date-5"
                    className="radio-button-lg !bg-rose-50 !text-rose-500 [&.ant-radio-button-wrapper-checked]:!border-rose-500 [&.ant-radio-button-wrapper-checked]:!ring-rose-500"
                  >
                    2nd May
                  </Radio.Button>
                  <Radio.Button
                    value="date-6"
                    className="radio-button-lg !bg-rose-50 !text-rose-500 [&.ant-radio-button-wrapper-checked]:!border-rose-500 [&.ant-radio-button-wrapper-checked]:!ring-rose-500"
                  >
                    9th May
                  </Radio.Button>
                  <Radio.Button value="date-7" className="radio-button-lg">
                    16th May
                  </Radio.Button>
                  <Radio.Button value="date-8" className="radio-button-lg">
                    23rd May
                  </Radio.Button>
                  <Radio.Button value="date-9" className="radio-button-lg">
                    30th May
                  </Radio.Button>
                  <Radio.Button value="date-10" className="radio-button-lg">
                    4th June
                  </Radio.Button>
                  <Radio.Button value="date-11" className="radio-button-lg">
                    11th June
                  </Radio.Button>
                  <Button size="large" className="radio-button-lg">
                    More <div className="hidden ml-1 md:inline">dates</div>...
                  </Button>
                </Radio.Group>
              </div>
            </section>
            <section className="space-y-4 lg:contents">
              <div className="z-30 max-lg:py-3 max-lg:border-t border-t-black/10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:sticky lg:top-4 sm:max-lg:py-4 max-lg:bg-white/95 lg:mt-6">
                <div className="container lg:p-0">
                  <Button
                    size="large"
                    type="primary"
                    block
                    className={`!transition-all !duration-500 ${basketButtonClasses}`}
                    onClick={addToBasketAndOpen}
                  >
                    {basketButtonText}
                  </Button>
                </div>
              </div>
              {/* <div className="flex justify-center">
                <div className="px-4 py-1.5 text-sm text-neutral-800 rounded-full bg-neutral-100">
                  Estimated monthly total{" "}
                  <span className="heading-sm">£64.00</span>
                </div>
              </div> */}
            </section>
            <section className="space-y-4">
              <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                Details
              </div>
              <dl className="grid grid-cols-4 sm:grid-cols-5 [&>dt]:col-span-1 [&>dt]:truncate [&>dd]:col-span-3 sm:[&>dd]:col-span-4 gap-y-3 sm:gap-y-4 gap-x-2">
                <dt>Discounts</dt>
                <dd>
                  3 discounts are available.{" "}
                  <button type="button" className="link">
                    View
                  </button>
                </dd>
                <dt>Age</dt>
                <dd>
                  Suitable for babies aged 12-18 months with a parent/guardian
                </dd>
                <dt>Time</dt>
                <dd>Every Tuesday at 11:30 - 12:00</dd>
                <dt>Address</dt>
                <dd>Quarterway House, Ely Rd, Little Thetford</dd>
                <dt>Billing</dt>
                <dd>
                  You will be billed every month on the 1st. This is an
                  auto-renewing product.
                </dd>
                <dt>Pro rata</dt>
                <dd>
                  Final cost at checkout may vary depending on the time or
                  sessions left in the period.
                </dd>
                <dt>Service fee</dt>
                <dd>
                  A service fee will be applied at checkout.{" "}
                  <button type="button" className="link">
                    View
                  </button>
                </dd>
                <dt>Approval</dt>
                <dd>
                  This purchase requires approval by the organisation prior to
                  the purchase proceeding.
                </dd>
              </dl>
            </section>
            <section className="space-y-4">
              <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                Description
              </div>
              <p>
                This class is targeted at 12-18 month old children. We focus on
                encouraging and supporting using short bursts of energy to play,
                splash, kick, rotate, balance, crawl, float, and start to
                interpret swimming cues through songs and phrases.
              </p>
            </section>
            <section className="space-y-4">
              <div className="pb-2 mb-3 border-b border-neutral-200 heading">
                Coach Profile ·{" "}
                <span className="sub-heading">Michael Phelps</span>
              </div>
              <img
                className="sm:float-left aspect-[3/2] object-cover sm:max-w-[30%] rounded-md sm:mr-5 sm:mb-5 relative sm:-top-1"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Michael_Phelps_Rio_Olympics_2016.jpg/440px-Michael_Phelps_Rio_Olympics_2016.jpg"
                alt="Michael Phelps"
              />
              <p>
                Michael Fred Phelps II (born June 30, 1985) is an American
                former competitive swimmer. He is the most successful and most
                decorated Olympian of all time with a total of 28 medals. Phelps
                also holds the all-time records for Olympic gold medals (23),
                Olympic gold medals in individual events (13), and Olympic
                medals in individual events (16). At the 2004 Summer Olympics in
                Athens, Phelps tied the record of eight medals of any color at a
                single Games, held by gymnast Alexander Dityatin, by winning six
                gold and two bronze medals.
              </p>
              <p>
                Four years later, when he won eight gold medals at the 2008
                Beijing Games, he broke fellow American swimmer Mark Spitz's
                1972 record of seven first-place finishes at any single Olympic
                Games. At the 2012 Summer Olympics in London, Phelps won four
                gold and two silver medals, and at the 2016 Summer Olympics in
                Rio de Janeiro, he won five gold medals and one silver. This
                made him the most successful athlete of the Games for the fourth
                Olympics in a row.
              </p>
            </section>
          </div>
        </div>
      </Main>
    </>
  );
}

export default BubbleTheSeahorse;
