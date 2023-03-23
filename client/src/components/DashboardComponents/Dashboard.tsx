import { data01 } from "../../tempData";
import DashboardStatus from "./DashboardStatus";
import DashboardProjectsInfo from "./DashboardProjectsInfo";
import { useEffect, useState } from "react";
import { useLogin } from "/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider";
import axios from "axios";
import { useDashboard } from "/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/DashboardProvider";

interface PieObjectType {
  name: string;
  value: number;
}

export const Dashboard = () => {
  const dashStatus = useDashboard();
  const login = useLogin();

  const [pieData, setPieData] = useState<PieObjectType[]>([
    { name: "High", value: 0 },
    { name: "Medium", value: 0 },
    { name: "Low", value: 0 },
  ]);

  const [userTicketList, setUserTicketList] = useState([{}]);
  const [userProjectList, setUserProjectList] = useState([]);
  let test: any = [];

  let sum: number = pieData.reduce((accumulator: number, object: any) => {
    return accumulator + object.value;
  }, 0);

  const id = login?.loginInfo._id;

  const fetchDashInfo = async () => {
    axios
      .all([
        axios.get("http://localhost:3002/ticket/list"),
        axios.get("http://localhost:3002/project/list"),
      ])
      .then(
        axios.spread((data1, data2) => {
          const ticketList = data1.data;
          test = data1.data;
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
          const lowPrioTickets = ticketList.filter(
            (entry: any, index: number) => {
              return entry.prio === "Low";
            }
          );

          setPieData([
            { name: "High", value: highPrioTickets.length },
            { name: "Med", value: medPrioTickets.length },
            { name: "Low", value: lowPrioTickets.length },
          ]);

          //Dashboard Stats
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

  const fetchUserTickets = (fullName: string) => {
    const ticketList = test;

    //list of tickets assigned to current user
    const userTickets = ticketList.filter((entry: any, index: number) => {
      return entry.dev === fullName;
    });
    setUserTicketList(userTickets);

    if (userTickets.length > 0) {
      localStorage.setItem("assignedTickets", JSON.stringify(userTickets));
    }
  };

  useEffect(() => {
    const tempTickets: any = localStorage.getItem("assignedTickets");
    fetchDashInfo();

    if (tempTickets !== null) {
      const newTickets = JSON.parse(tempTickets);

      setUserTicketList(newTickets);
    }

    if (!id) {
      const temp: any = localStorage.getItem("login state");
      const obj = JSON.parse(temp);
      let newId = obj._id;

      axios
        .get(`http://localhost:3002/user/${newId}`)
        .then((response) => {
          localStorage.setItem("login state", JSON.stringify(response.data));
          login?.setLoginInfo({ ...response.data });
        })
        .catch((error) => {
          console.log("error");
        });

      axios.get(`http://localhost:3002/team/${newId}`).then((response) => {
        const test = JSON.stringify(response.data);
        localStorage.setItem("team state", test);
        setUserProjectList(response.data.projects);
      });
    }

    if (id) {
      axios
        .get(`http://localhost:3002/user/${id}`)
        .then((response) => {
          localStorage.setItem("login state", JSON.stringify(response.data));
          login?.setLoginInfo({ ...response.data });
          fetchUserTickets(response.data.fullName);
        })
        .catch((error) => {
          console.log(error.data);
        });

      //get projects
      const temp: any = localStorage.getItem("team state");

      if (!temp) {
        axios.get(`http://localhost:3002/team/${id}`).then((response) => {
          const test = JSON.stringify(response.data);
          localStorage.setItem("team state", test);
          setUserProjectList(response.data.projects);
        });
      } else {
        const obj = JSON.parse(temp);
        setUserProjectList(obj.projects);
      }
    }
  }, []);

  return (
    <div className="flex h-full  w-full flex-col bg-[#F4F6F6] md:w-5/6">
      <DashboardStatus
        setPieData={setPieData}
        setUserTicketList={setUserTicketList}
      />
      <DashboardProjectsInfo
        pieData={pieData}
        sum={sum}
        ticketList={userTicketList}
        projectList={userProjectList}
      />
    </div>
  );
};
