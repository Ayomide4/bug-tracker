import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ConfirmDelete from "./ConfirmDelete";
import { toast, ToastContainer } from "react-toastify";
import TicketInfoModal from "/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/components/ProjectComponents/TicketInfoModal";
import Edit from "../Edit";

const notifyDelete = (success: boolean) => {
  if (success) {
    toast.success("Successfully Deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else if (!success) {
    toast.error("Error deleting Project", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

interface Props {
  selected: boolean;
  setIsSelected: React.Dispatch<SetStateAction<boolean>>;
  selectedInfo: {
    title: string;
    desc: string;
    manager: string;
    team: string;
    status: string;
    date: string;
    id: string;
    deadline: string;
    tickets: string[];
    members: string[];
  
  };
  setSelectedInfo: React.Dispatch<
    SetStateAction<{
      title: string;
      desc: string;
      manager: string;
      team: string;
      status: string;
      date: string;
      id: string;
      deadline: string;
      tickets: string[];
      members: string[];
    }>
  >;
}

interface ticketType {
  title: string;
  desc: string;
  dev: string;
  prio: string;
}




export default function SelectedProject({
  selected,
  setIsSelected,
  selectedInfo,
  setSelectedInfo,
}: Props) {
  //TODO: make it so only admin can delete/edit
  //  DELETE and EDIT button shouldn't show up for regular users

  const [trigger, setTrigger] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toggleEditModal, setToggleEditModal] = useState<boolean>(false);
  const [ticketData, setTicketData] = useState<ticketType>({
    title: "",
    desc: "",
    dev: "",
    prio: "",
  });
  const [members, setMembers] = useState<any>();
  const handleDelete = () => {
    //sends a delete request to the server
    setTrigger((prev) => !prev); //sets trigger to open so we can see the confirm delete page

    //if page is open delete project
    if (trigger) {
      axios
        .delete(`http://localhost:3002/project/${selectedInfo.id}`)
        .then(() => {
          setIsSelected((prevSelected) => !prevSelected);
        })
        .catch((error) => {
          notifyDelete(false);
          console.error("There was an error!", error);
        });
    }
  };

  const toggleEdit = () => {
    setToggleEditModal((prev: boolean) => !prev);
  };

  //when we click item it gets that specific item from the mapped items
  const clickTicket = (item: any) => {
    setIsModalOpen((prev: boolean) => !prev);
    setTicketData({
      title: item.ticketId.title,
      desc: item.ticketId.desc,
      dev: item.ticketId.dev,
      prio: item.ticketId.prio,
    });
  };

  // console.log("SELECTED INFO", selectedInfo);

  const renderTickets = selectedInfo.tickets.map(
    (ticketItem: any, index: number) => {
      //colors for the prio range
      const prioColors = ["lowPrio", "medPrio", "highPrio"];

      let colorIndex = 0;

      switch (ticketItem.ticketId.prio) {
        case "Low":
          colorIndex = 0;
          break;
        case "Medium":
          colorIndex = 1;
          break;
        case "High":
          colorIndex = 2;
          break;
      }

      return (
        <tr
          key={index}
          className="cursor-pointer hover:bg-gray-200"
          onClick={() => clickTicket(ticketItem)}
        >
          <td className="whitespace-nowrap pl-2">
            {ticketItem.ticketId.title}
          </td>
          <td className="whitespace-nowrap">
            {ticketItem.ticketId.desc.length > 40
              ? `${ticketItem.ticketId.desc.substring(0, 40)}...`
              : ticketItem.ticketId.desc}
          </td>
          <td
            className={`whitespace-nowrap bg-${prioColors[colorIndex]} rounded px-1 font-semibold text-white`}
          >
            {ticketItem.ticketId.prio}
          </td>
          <td className="whitespace-nowrap">Blank</td>
        </tr>
      );
    }
  );


  useEffect(() => {
    //deletes project when confirm delete state changes
    axios.patch('http://localhost:3002/members', {teamName: selectedInfo.team})
      .then((res) => {
        console.log('hello', res.data.members);
        setMembers(res.data.members);
    })
    //TODO: CONFIRM DELETE IS COMMENTED BECAUSE ON REFRESH IT ACCIDENTALLY DELETES PROJECT
    //handleDelete();
  }, [confirmDelete]);

  return (
    <div className="w-full">
      <ToastContainer />
      {trigger && (
        <ConfirmDelete
          trigger={trigger}
          setTrigger={setTrigger}
          setConfirmDelete={setConfirmDelete}
          title={selectedInfo.title}
        />
      )}
      <div className="mt-6 flex w-full items-center justify-between">
        <div
          className="ml-4 flex w-44 cursor-pointer items-center"
          onClick={() => {
            setIsSelected((prev) => !prev);
          }}
        >
          <FaArrowLeft color="#1D3557" size={20} />
          <h1 className="ml-1 text-xl font-bold text-[#1D3557]">
            Project Details
          </h1>
        </div>
        <div className="mr-4">
          <button
            className="h-15 w-24 rounded-md border bg-[#1D3557] p-2 text-base text-white"
            onClick={toggleEdit}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="h-15 w-24 rounded-md border bg-[#e63946] p-2 text-base text-white"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex h-itemContainer justify-between">
        <div className="mx-6 mt-6 flex h-full w-1/3 flex-col">
          <div className="mb-4 h-32 w-full rounded border border-[#2A6470] bg-white">
            <h1 className="mx-2 text-lg font-semibold text-[#1D3557]">
              {selectedInfo.title}
            </h1>
            <p className="mx-4 mb-4">{selectedInfo.desc}</p>
          </div>
          <div className="mb-4 mt-6 h-40 w-full rounded border border-[#2A6470] bg-white ">
            <div className="mx-4 mt-4 mb-2  flex items-center justify-between">
              <h1 className="text-lg">Created: </h1>
              <h1 className="text-lg">{selectedInfo.date}</h1>
            </div>
            <div className="mx-4 my-2 flex items-center justify-between">
              <h1 className="text-lg">Deadline: </h1>
              <h1 className="text-lg">{selectedInfo.deadline}</h1>
            </div>
            <div className="mx-4 my-2 flex items-center justify-between">
              <h1 className="text-lg">Status</h1>
              <h1 className="text-lg">{selectedInfo.status}</h1>
            </div>
          </div>
          <div className="mt-4 h-52 w-full rounded border border-[#2A6470] bg-white">
            <h1 className=" mx-2 mb-2 text-lg font-semibold text-[#1D3557]">
              Team - {selectedInfo.team}
            </h1>
            {/*Team list component maybe */}
            <table className="w-full border border-x-0 border-black">
              <thead className="bg-[#F3F4F6] text-left text-[#707785]">
                <tr>
                  <th className="whitespace-nowrap pl-2">Name</th>
                </tr>
              </thead>
              <tbody className="text-left">
                <tr>
                  <td className="whitespace-nowrap pl-2">Ayo Omotosho</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 mr-6 h-full w-2/3 rounded border border-[#2A6470] bg-white">
          <div className="mt-2 h-itemContainer">
            <h1 className="mx-2 mb-2 text-lg font-semibold text-[#1D3557]">
              Tickets
            </h1>
            <table className="w-full border border-x-0 border-b-0 border-black">
              <thead className="bg-[#F3F4F6] text-left text-[#707785]">
                <tr>
                  <th className="pl-2">Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Developer</th>
                </tr>
              </thead>
              <tbody className="text-left">{renderTickets}</tbody>
            </table>
          </div>
        </div>
      </div>
      <TicketInfoModal
        ticketData={ticketData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        members={members}
      />
      {toggleEditModal && (
        <Edit
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
          toggleEdit={toggleEdit}
        />
      )}
    </div>
  );
}
