import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Tiles from "../components/tile";
import Footer from "../components/footer";
import Main from "../components/main";
import Banner from "../components/banner";
import About from "../components/about";
function Home(): ReactElement {
  return (
    <>
      <Header />
      <Breadcrumb />
      <Main className="pb-20 space-y-6 sm:space-y-8">
        <Banner />
        <About />
        <Tiles />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
