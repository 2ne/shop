import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import CalendarWeek from "../components/calendar/calendar-week";
function AdultChildLessons(): ReactElement {
  const breadcrumbItems = [
    { label: "Adult and Child Lessons", link: "/AdultChildLessons" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-20">
        <CalendarWeek />
      </Main>
    </>
  );
}

export default AdultChildLessons;
