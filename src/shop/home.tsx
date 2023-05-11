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
      <Main>
        <Banner />
        <div className="mb-5 rounded-md shadow shadow-neutral-900/10 ring-1 ring-neutral-600 ring-opacity-10 sm:mb-6 xl:mb-8 2xl:mb-9 p-0.5">
          <div className="flex gap-9 p-14 bg-neutral-100 rounded-[calc(0.375rem-0.125rem)]">
            <img
              src="https://i.ibb.co/PGbKx8c/michael-dam-m-EZ3-Po-FGs-k-unsplash-1.jpg"
              className="object-cover object-center mb-8 rounded-full w-44 h-44 aspect-square"
            />
            <div>
              <h2 className="pb-4 mb-4 -mt-1 text-lg font-bold border-b border-neutral-300/50 text-neutral-800 md:text-xl">
                Welcome to CG Swim School
              </h2>
              <p className="text-base md:text-lg">
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
