import { useState } from "react";
import ProgressBar from "react-animated-progress-bar";
import TicketItem from "./TicketItem";
import { projectDashboardType } from "/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/App";

interface Props {
  projectDashboard: projectDashboardType;
  setProjectDashboard: React.Dispatch<
    React.SetStateAction<projectDashboardType>
  >;
}

export default function Ticket() {
  const [listLength, setListLength] = useState<number>(0);
  const [ticketStatus, setTicketStatus] = useState({
    total: 0,
    open: 0,
    development: 0,
  });
  let percentage: string = "50";
  const ticketCategories: string[] = [
    "Title",
    "Submitted By",
    "Status",
    "Priority",
    "Last Updated",
  ];

  return (
    <>
      <div className="flex h-full w-full flex-col items-center">
        <h1 className="mt-6 w-full pl-6 text-2xl font-semibold text-[#1D3557]">
          Tickets
        </h1>

        <div className=" mt-6 grid grid-cols-1 w-full md:w-11/12 md:grid-cols-3 md:gap-2">
          <div className="hidden md:flex h-48 flex-col items-center justify-center rounded-lg border border-[#1D3557] bg-white shadow-md">
            <h2 className="text-center text-2xl font-bold text-black">
              {listLength}
            </h2>
            <h2 className="text-md text-center text-gray-500">Total Tickets</h2>
          </div>
          <div className="hidden md:flex h-48  flex-col items-center justify-center rounded-lg border border-[#1D3557] bg-white shadow-md">
            <div className="mt-4 mb-2 h-24 w-24 ">
              <ProgressBar
                width="200px"
                height="10px"
                fontColor="black"
                trackWidth="18"
                percentage={percentage}
                trackPathColor="#F3F4F6"
                trackBorderColor="white"
                defColor={{
                  fair: "green",
                  good: "green",
                  excellent: "green",
                  poor: "green",
                }}
              />
            </div>
            <h2 className="text-center text-2xl font-bold text-black">
              {ticketStatus.open}
            </h2>
            <h2 className="text-md mb-4 text-center text-gray-500">
              Status: Open
            </h2>
          </div>
          <div className="hidden md:flex h-48 flex-col items-center justify-center rounded-lg border border-[#1D3557] bg-white shadow-md">
            <div className="mt-4 mb-2 h-24 w-24 ">
              <ProgressBar
                width="200px"
                height="10px"
                fontColor="black"
                trackWidth="18"
                percentage={percentage}
                trackPathColor="#F3F4F6"
                trackBorderColor="white"
                defColor={{
                  fair: "#457B9D",
                  good: "#457B9D",
                  excellent: "#457B9D",
                  poor: "#457B9D",
                }}
              />
            </div>
            <h2 className="text-center text-2xl font-bold text-black">
              {ticketStatus.development}
            </h2>
            <h2 className="text-md mb-2 text-center text-gray-500">
              Status: Development
            </h2>
          </div>
        <div className="mt-4 md:col-span-3 mx-4 h-full md:h-3/5 ">
          <TicketItem
            title="Tickets"
            btn="Ticket"
            categories={ticketCategories}
            ticketStatus={ticketStatus}
            setTicketStatus={setTicketStatus}
            listLength={listLength}
            setListLength={setListLength}
          />
        </div>
        </div>
      </div>
    </>
  );
}
