import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import Finder from "../components/finder/finder";
function ClassFinder(): ReactElement {
  const breadcrumbItems = [{ label: "Class finder", link: "/Finder" }];
  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main>
        <Finder />
      </Main>
      <Footer />
    </>
  );
}

export default ClassFinder;
