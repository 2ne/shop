import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import { Link } from "react-router-dom";

function AdultChildLessons(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main>
        <Link
          to="/BubbleTheSeahorse"
          className="font-medium text-interactive hover:underline"
        >
          BubbleTheSeahorse
        </Link>
      </Main>
      <Footer />
    </>
  );
}

export default AdultChildLessons;
