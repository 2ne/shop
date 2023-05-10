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
        <div className="py-10 mb-5 rounded-md px-14 bg-neutral-100 sm:mb-6 xl:mb-8 2xl:mb-9 ">
          <h2 className="flex items-center text-lg font-bold text-neutral-800 md:text-xl group-hover/link:underline underline-offset-4">
            Welcome to CG Swim School
          </h2>
          <p className="mt-4 text-base md:text-lg">
            We are a family-run swimming school whose aim is to inspire swimmers
            to be confident and safe whilst having fun. We strive to provide a
            friendly, welcoming atmosphere with a personal touch. All swimmers
            are welcome, from 3 months old to 100 years old, regardless of their
            previous experience and level of confidence. Our lessons are
            tailored to each individual need and we keep to a strict ratio of no
            more than 4 babies, 3 children or 2 adults per lesson. This is to
            ensure we can give our full attention to each swimmer and help them
            make as much progress as possible.
          </p>
        </div>
        <Tiles />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
