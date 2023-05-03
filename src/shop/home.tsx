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
        <Tiles />
      </Main>
      <Footer />
    </>
  );
}

export default Home;
