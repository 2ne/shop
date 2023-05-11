import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Tiles from "../components/tile";
import Footer from "../components/footer";
import Main from "../components/main";
import Banner from "../components/banner";
function Home(): ReactElement {
  return (
    <>
      <Header />
      <Breadcrumb />
      <Main className="pb-20 space-y-6 sm:space-y-8">
        <Banner />
        <div className="rounded-md shadow shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10 p-0.5">
          <div className="md:flex md:gap-8 lg:gap-10 p-4 sm:p-6 md:p-10 lg:p-14 lg:pb-12 bg-neutral-100 rounded-[calc(0.375rem-0.125rem)]">
            <img
              src="https://i.ibb.co/PGbKx8c/michael-dam-m-EZ3-Po-FGs-k-unsplash-1.jpg"
              className="object-cover object-center md:mb-8 border-[0.125rem] ring-1 ring-neutral-200 border-white rounded-full w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 aspect-square max-md:mx-auto"
            />
            <div className="contents md:block">
              <h2 className="mb-2.5 text-lg font-bold md:mb-4 md:-mt-1 text-neutral-800 md:text-xl max-md:text-center max-md:mt-2">
                Welcome to CG Swim School
              </h2>
              <div className="h-[2px] mb-2.5 md:mb-4 bg-white border-t border-solid border-neutral-200"></div>
              <p>
                We are a family-run swimming school whose aim is to inspire
                swimmers to be confident and safe whilst having fun. We strive
                to provide a friendly, welcoming atmosphere with a personal
                touch. All swimmers are welcome, from 3 months old to 100 years
                old, regardless of their previous experience and level of
                confidence. Our lessons are tailored to each individual need and
                we keep to a strict ratio of no more than 4 babies, 3 children
                or 2 adults per lesson. This is to ensure we can give our full
                attention to each swimmer and help them make as much progress as
                possible.
              </p>
            </div>
          </div>
        </div>
        <Tiles />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
