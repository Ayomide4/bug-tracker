import axios from "axios";
import { useState, useEffect } from "react";

export default function ProjectItem(props: any) {
  const [data, setData] = useState([{}]);

  const clickItem = (e: any, entry: any) => {
    props.setIsSelected((prev: boolean) => !prev);
    props.setSelectedInfo({
      ...props.selectedInfo,
      title: entry.title,
      desc: entry.desc,
      manager: entry.manager,
      team: entry.team,
      status: entry.status,
      date: entry.date,
      id: entry._id,
      tickets: entry.tickets
    });
    let test:any = "Test Project"
    
    console.log('ON CLICK ITEM',entry)
  };

  //TODO: Filter active projects and get length to send to dashboard

  //fetches list of projects and saves it into data state
  const fetchData = async () => {
    axios
      .get("http://localhost:3002/project/list")
      .then((res) => {
        const list = res.data;
        setData(list.reverse());
        props.setListLength(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  //updates list when length changes
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 100);
  }, [props.listLength]);

  //render data
  const dataArray = data.map((entry: any, index: number) => {
    return (
      <tr
        className="cursor-pointer hover:bg-gray-200"
        onClick={(e) => clickItem(e, entry)}
        key={index}
      >
        <td id="title" className="whitespace-nowrap pl-4 text-lg">
          {entry.title}
        </td>
        <td
          id="desc"
          className="max-h-6 max-w-4xl whitespace-nowrap px-2 text-lg"
        >
          {entry.desc !== undefined && entry.desc.length > 45
            ? `${entry.desc.substring(0, 50)}...`
            : entry.desc}
        </td>
        <td id="manager" className="whitespace-nowrap text-lg">
          {entry.manager}
        </td>
        <td id="team" className="whitespace-nowrap text-lg">
          {entry.team}
        </td>
        <td id="status" className="whitespace-nowrap text-lg">
          {entry.status}
        </td>
      </tr>
    );
  });

  return (
    <div className="relative z-0 max-h-itemContainer min-w-full flex-none overflow-scroll">
      <table className="w-full">
        <thead className="text-left text-[#707785]">
          <tr>
            <th className="sticky top-0 max-h-4 w-52 bg-[#F3F4F6] py-3 pl-4">
              Title
            </th>
            <th className="sticky top-0 max-h-4 bg-[#F3F4F6] py-3 px-2">
              Description
            </th>
            <th className="sticky top-0 max-h-4 w-32 bg-[#F3F4F6] py-3 ">
              Manager
            </th>
            <th className="sticky top-0 max-h-4 w-32 bg-[#F3F4F6] py-3">
              Team
            </th>
            <th className="sticky top-0 max-h-4 w-32 bg-[#F3F4F6] py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-left">
          {dataArray !== undefined ? dataArray : null}
        </tbody>
      </table>
    </div>
  );
}
