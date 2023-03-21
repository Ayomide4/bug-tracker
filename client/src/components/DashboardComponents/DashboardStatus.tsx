import axios from "axios";
import { useDashboard } from "/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/DashboardProvider";
import { useEffect } from "react";
import { useLogin } from "../../LoginProvider";
import { toToastItem } from "react-toastify/dist/utils";

interface Props {
  setPieData: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        value: number;
      }[]
    >
  >;
}

export default function DashboardStatus({ setPieData }: Props) {
  let total = 0;

  //TODO: Filter active projects and get length to send to dashboard

  // const login = useLogin()

  const dashStatus = useDashboard();
  const fetchDashInfo = async () => {
    axios
      .all([
        axios.get("http://localhost:3002/ticket/list"),
        axios.get("http://localhost:3002/project/list"),
      ])
      .then(
        axios.spread((data1, data2) => {
          const ticketList = data1.data;
          const projectList = data2.data;
          const totalTickets = ticketList.length;

          //get high/med/low prio numbers from tickets list
          const highPrioTickets = ticketList.filter(
            (entry: any, index: number) => {
              return entry.prio === "High";
            }
          );
          const medPrioTickets = ticketList.filter(
            (entry: any, index: number) => {
              return entry.prio === "Medium";
            }
          );
          const lowPrioTicket = ticketList.filter(
            (entry: any, index: number) => {
              return entry.prio === "Low";
            }
          );

          setPieData([
            { name: "High", value: highPrioTickets.length },
            { name: "Med", value: medPrioTickets.length },
            { name: "Low", value: medPrioTickets.length },
          ]);



          const assignedTicketList = ticketList.filter(
            (entry: any, index: number) => {
              return entry.dev !== "none";
            }
          );
          const activeProjects = projectList.filter(
            (entry: any, index: number) => {
              return entry.status === "Active";
            }
          );
          dashStatus?.setProjectDashboard({
            ...dashStatus.projectDashboard,
            totalTickets: totalTickets,
            activeProjects: activeProjects.length,
            assignedTickets: assignedTicketList.length,
            unassignedTickets: totalTickets - assignedTicketList.length,
          });
        })
      );
  };

  useEffect(() => {
    fetchDashInfo();
  }, [dashStatus?.projectDashboard.totalTickets]);

  return (
    <div>
      <h2 className="mx-6 mb-6 mt-6 text-3xl font-medium text-[#1D3557] md:mb-10">
        Dashboard
      </h2>
      <div className="mx-4 grid max-w-full grid-cols-2 gap-4 md:grid-cols-4 ">
        <div className="flex h-44 flex-col items-center justify-center rounded-lg bg-[#E63946] shadow-md">
          <h2 className="text-center text-2xl font-bold text-black">
            {dashStatus?.projectDashboard.activeProjects}
          </h2>
          <h2 className="mb-2 text-center text-xl text-black">
            Active Projects
          </h2>
        </div>
        <div className="flex h-44 flex-col items-center justify-center rounded-lg bg-[#457b9d] shadow-md">
          <h2 className="text-center text-2xl font-bold text-black">
            {dashStatus?.projectDashboard.totalTickets}
          </h2>
          <h2 className="mb-2 text-center text-xl text-black">Total Tickets</h2>
        </div>
        <div className="flex h-44 flex-col items-center justify-center rounded-lg bg-[#A8DADC] shadow-md">
          <h2 className="text-center text-2xl font-bold text-black">
            {dashStatus?.projectDashboard.assignedTickets}
          </h2>
          <h2 className="mb-2 text-center text-xl text-black">
            Assigned Tickets
          </h2>
        </div>
        <div className="flex h-44 flex-col items-center justify-center rounded-lg bg-[#FFC211] shadow-md">
          <h2 className="text-center text-2xl font-bold text-black">
            {dashStatus?.projectDashboard.unassignedTickets}
          </h2>
          <h2 className="mb-2 text-center text-xl text-black">
            Unassigned Tickets
          </h2>
        </div>
      </div>
    </div>
  );
}
