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
      <Main className="space-y-4 sm:space-y-8">
        <div className="lg:sticky lg:top-0 space-y-0.5 pb-4 border-b sm:space-y-0 border-neutral-200 lg:backdrop-blur lg:bg-blend-overlay lg:bg-white/75 lg:z-20 lg:-mt-3 lg:pt-3">
          <h2 className="heading-lg">Bubble the Seahorse</h2>
          <h3 className="sub-heading">Every Tuesday at 11:30 - 12:00</h3>
        </div>
        <div className="space-y-4 sm:space-y-0 sm:grid sm:gap-10 lg:grid-cols-2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1651614158095-b98b6c1da74b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
              className="rounded-md aspect-[3/2] object-cover lg:sticky lg:top-28"
              loading="lazy"
            />
          </div>
          <div className="space-y-6 sm:space-y-10">
            <section className="sm:-mt-1.5">
              <div className="mb-2 sm:mb-3 heading">Purchase options</div>
              <div>
                <Radio.Group
                  defaultValue="a"
                  size="large"
                  className="flex w-full gap-2 sm:gap-4"
                >
                  <Radio.Button value="a" className="radio-button-xl">
                    <div className="heading">Session · £16.00</div>
                    <div className="mt-0.5 sub-heading-sm">
                      Every Tuesday
                      <span className="hidden lg:inline">
                        {" "}
                        at 11:30 - 12:00
                      </span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="b" className="radio-button-xl">
                    <div className="heading">Trial · £5.00</div>
                    <div className="mt-0.5 sub-heading-sm">
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
                  className="grid w-full grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-4"
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
                    className="radio-button-lg"
                    disabled
                  >
                    2nd May
                  </Radio.Button>
                  <Radio.Button
                    value="date-6"
                    className="radio-button-lg"
                    disabled
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
              <div className="z-30 max-lg:py-3 max-lg:border-t border-t-black/10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 lg:sticky lg:top-4 sm:max-lg:py-4 max-lg:backdrop-blur max-lg:bg-blend-overlay max-lg:bg-white/75 lg:mt-6">
                <div className="container lg:p-0">
                  <Button
                    size="large"
                    type="primary"
                    block
                    className="!h-10 lg:!h-12"
                  >
                    <div className="text-sm sm:text-base">Add to basket</div>
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
              <dl className="text-sm grid grid-cols-4 sm:grid-cols-5 [&>dt]:col-span-1 [&>dt]:text-neutral-500 [&>dd]:col-span-3 sm:[&>dd]:col-span-4 [&>dd]:text-neutral-800 gap-y-4">
                <dt>Discounts</dt>
                <dd>
                  3 discounts are available.{" "}
                  <a href="#" className="link">
                    View options
                  </a>
                </dd>
                <dt>Age</dt>
                <dd>
                  Suitable for babies ages up to 3 years with a parent/guardian
                </dd>
                <dt>Time</dt>
                <dd>Every Tuesday @ 11:30 - 12:00</dd>
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
                <dt>Aprroval</dt>
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
              <p className="text-sm text-neutral-800">
                This class is targeted at 12-18 month old children. We focus on
                encouraging and supporting using short bursts of energy to play,
                splash, kick, rotate, balance, crawl, float, and start to
                interpret swimming cues through songs and phrases.
              </p>
            </section>
            <section className="space-y-4">
              <div className="pb-2 border-b sm:mb-3 border-neutral-200 heading">
                Coach Profile ·{" "}
                <span className="sub-heading">Arsène Wenger</span>
              </div>
              <img
                className="float-left aspect-[3/2] object-cover max-w-[25%] rounded-md mr-4 mb-3 relative -top-2"
                src="https://m.media-amazon.com/images/M/MV5BMDUwNWI1NDktZTkyYS00NTgwLWI3YTAtNDM4YWNkNTU3ZTdlXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg"
              />
              <p className="text-sm text-neutral-800">
                Arsène Charles Ernest Wenger OBE, born 22 October 1949 is a
                French former football manager and player who is currently
                serving as FIFA's Chief of Global Football Development. He was
                the manager of Arsenal from 1996 to 2018, where he was the
                longest-serving and most successful in the club's history. His
                contribution to English football through changes to scouting,
                players' training, and diet regimens revitalised Arsenal and
                aided the globalisation of the sport in the 21st century. Born
                in Strasbourg and raised in Duttlenheim to an entrepreneurial
                family, Wenger was introduced to football by his father, the
                manager of the local village team.
              </p>
              <p className="text-sm text-neutral-800">
                After a modest playing career, in which he made appearances for
                several amateur clubs, Wenger obtained a manager's diploma in
                1981. Following an unsuccessful period at Nancy in 1987, Wenger
                joined Monaco; the club won the league championship in 1988. In
                1991, Wenger guided Monaco to victory in the Coupe de France. In
                1995, he moved to Japan to coach J.League side Nagoya Grampus
                Eight and won the Emperor's Cup and Japanese Super Cup in his
                first and only year.
              </p>
            </section>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

export default BubbleTheSeahorse;
