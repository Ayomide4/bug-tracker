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

  //get projects
  const temp: any = localStorage.getItem("team state");
  const obj = JSON.parse(temp);
  const projects = obj.projects;

  const [pieData, setPieData] = useState<PieObjectType[]>([
    { name: "High", value: 0 },
    { name: "Medium", value: 0 },
    { name: "Low", value: 0 },
  ]);

  const [userTicketList, setUserTicketList] = useState([{}]);

  let sum: number = pieData.reduce((accumulator: number, object: any) => {
    return accumulator + object.value;
  }, 0);

  const id = login?.loginInfo._id;

  useEffect(() => {
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
    }
    if (id) {
      axios
        .get(`http://localhost:3002/user/${id}`)
        .then((response) => {
          localStorage.setItem("login state", JSON.stringify(response.data));
          login?.setLoginInfo({ ...response.data });
        })
        .catch((error) => {
          console.log(error.data);
        });
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
        projectList={projects}
      />
    </div>
  );
};
