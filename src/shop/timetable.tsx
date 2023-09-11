import { ReactElement } from "react";
import Breadcrumb from "../components/breadcrumb";
import Header from "../components/header";
import Main from "../components/main";
import Calendar from "../components/calendar/calendar";
function Calendar(): ReactElement {
  const breadcrumbItems = [
    { label: "Little Telford Calendar", link: "/Calendar" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <Main className="pb-20">
        <Calendar singleProduct={false} />
      </Main>
    </>
  );
}

export default Calendar;
