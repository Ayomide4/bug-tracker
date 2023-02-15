import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ConfirmDelete from "./ConfirmDelete";
import { toast, ToastContainer } from "react-toastify";
import TicketInfoModal from "./TicketInfoModal";
//maybe should make this a shared component with ticket

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
    tickets: string[];
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
      tickets: string[];
    }>
  >;
}

interface ticketType{
  title: string;
  desc: string;
  dev: string;
  prio: string
}

export default function SelectedProject({
  selected,
  setIsSelected,
  selectedInfo,
  setSelectedInfo,
}: Props) {
  //TODO: make it so only admin can delete/edit
  //  DELETE and EDIT button shouldn't show up for regular users
  //TODO: highlight ticket colors based on prio

  const [trigger, setTrigger] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [ticketData, setTicketData] = useState<ticketType>({
    title: '',
    desc: '',
    dev: '',
    prio: ''
  })

  
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

  //when we click item it gets that specific item from the mapped items
  const clickTicket = ( item:any) => {
    
    setIsModalOpen((prev:boolean) => !prev)
    setTicketData({
      title: item.ticketId.title ,
      desc: item.ticketId.desc ,
      dev: item.ticketId.dev ,
      prio: item.ticketId.prio ,
    })
    console.log(item.ticketId)
  }

  const renderTickets = selectedInfo.tickets.map((item: any, index:number) => {
    return (
      <tr key={index} className="cursor-pointer hover:bg-gray-200" onClick={()=>clickTicket(item)}>
        <td className="whitespace-nowrap pl-2">{item.ticketId.title}</td>
        <td className="whitespace-nowrap">{item.ticketId.desc.length > 40 ? `${item.ticketId.desc.substring(0,40)}...`: item.ticketId.desc}</td>
        <td className="whitespace-nowrap">{item.ticketId.prio}</td>
        <td className="whitespace-nowrap">Blank</td>
      </tr>
    );
  });


  useEffect(() => {
    //deletes project when confirm delete state changes

    //TODO: CONFIRM DELETE IS COMMENTED BECAUSE ON REFRESH IT ACCIDENTALLY DELETES PROJECT
    //handleDelete()
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
          <button className="h-15 w-24 rounded-md border bg-[#1D3557] p-2 text-base text-white">
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

      <div className="flex h-3/4 justify-between">
        <div className="mx-6 mt-6 flex h-full w-1/3 flex-col">
          <div className="mb-4 h-40 w-full rounded border border-[#2A6470] bg-white">
            <h1 className=" mx-2 text-lg font-semibold text-[#1D3557]">
              {selectedInfo.title}
            </h1>
            <p className="mx-4 mb-4">{selectedInfo.desc}</p>
          </div>
          <div className="mb-4 mt-6 h-40 w-full rounded border border-[#2A6470] bg-white ">
            <div className="mx-4 my-4 flex items-center justify-between">
              <h1 className="text-lg">Created: </h1>
              <h1 className="text-lg">{selectedInfo.date}</h1>
            </div>
            <div className="mx-4 my-4 flex items-center justify-between">
              <h1 className="text-lg">Deadline: </h1>
              <h1 className="text-lg">Jan 31, 2023</h1>
            </div>
            <div className="mx-4 flex items-center justify-between">
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
                  <th className="whitespace-nowrap">Email</th>
                </tr>
              </thead>
              <tbody className="text-left">
                <tr>
                  <td className="whitespace-nowrap pl-2">Ayo Omotosho</td>
                  <td className="whitespace-nowrap">aomotosho4@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 mr-6 h-full w-2/3 rounded border border-[#2A6470] bg-white">
          <div className="mt-2">
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
      <TicketInfoModal ticketData={ticketData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  );
}
