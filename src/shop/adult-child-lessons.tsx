import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import CalendarWeek from "../components/calendar-week/week";

function AdultChildLessons(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main>
        <CalendarWeek />
      </Main>
      <div className="hidden sm:contents">
        <Footer />
      </div>
    </>
  );
}

export default AdultChildLessons;
