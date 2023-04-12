import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import axios from "axios";

//todo: create delete ticket/edit ticket

type Props = {
  btnTitle: string;
  setBtnTitle: React.Dispatch<React.SetStateAction<string>>;
  ticketData: {
    title: string;
    desc: string;
    dev: string;
    prio: string;
  };
  members: [
    {
      memberId: {
        fullName: string;
      };
    }
  ];
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const prioColors = ["lowPrio", "medPrio", "highPrio"];

export default function TicketInfoModal({
  ticketData,
  isModalOpen,
  setIsModalOpen,
  members,
  btnTitle,
  setBtnTitle,
}: Props) {
  let index: number = 0;

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen((prev: boolean) => !prev);
    setIsClicked((prev) => false);
  };

  const resolveTicket = async () => {
    const temp = localStorage.getItem("assignedTickets")
    const temp2 = JSON.parse(temp!)

    // filter out the ticket that was resolved
    const newArr = temp2.filter((item: any) => {
      return item.title !== ticketData.title
    })

    
    axios.patch("http://localhost:3002/ticket/resolve", {
      title: ticketData.title,
    }).then((res) => {
      localStorage.setItem("assignedTickets", JSON.stringify(newArr))
      window.location.reload()
    })
  }

  const handleClick = (e: any, item: any) => {
    if (item.memberId.fullName !== btnTitle) {
      setIsClicked((prev) => !prev);
      setBtnTitle(item.memberId.fullName);
      axios.patch("http://localhost:3002/update-ticket", {
        title: ticketData.title,
        dev: item.memberId.fullName,
      });
    }
  };

  if (ticketData.prio == "Low") {
    index = 0;
  } else if (ticketData.prio === "Medium") {
    index = 1;
  } else if (ticketData.prio === "High") {
    index = 2;
  }

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
          <div className="-ml-36 -mt-72 md:m-0  top-0 h-2/5 md:h-3/5 w-3/5 border border-black bg-white md:relative  md:w-2/5">
            <div className="relative h-full p-4">
              <div className="mb-2 flex items-center justify-between ">
                <div
                  className="mb-2 flex cursor-pointer items-center justify-center"
                  onClick={closeModal}
                >
                  <FaArrowLeft color="#1D3557" size={18} />
                  <h1 className="ml-1 text-xl font-bold text-[#1D3557]">
                    {ticketData.title}
                  </h1>
                </div>
                <div
                  className={`ml-40 mr-4 bg-${prioColors[index]}  w-fit py-1 px-2 text-white`}
                >
                  <h1 className=" font-semibold">{ticketData.prio}</h1>
                </div>
              </div>
              <div className="ml-6 w-11/12">
                <h2 className="text-lg font-semibold text-[#1D3557]">
                  Description
                </h2>
                <p className="ml-2 mb-4 h-32 max-h-52 w-4/5">
                  {ticketData.desc}
                </p>
                <div className="flex">
                  <label className="text-lg font-semibold text-[#1D3557]">
                    Ticket Developer:
                  </label>
                  <div className="ml-2 h-fit w-40 select-none rounded-sm border border-gray-500">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => setIsClicked((prev) => !prev)}
                    >
                      <div className="ml-2">{btnTitle}</div>
                      <div className="mr-2">
                        {!isClicked && <AiOutlineRight />}
                        {isClicked && <AiOutlineDown />}
                      </div>
                    </div>
                    <div>
                      {isClicked && (
                        <ul>
                          <hr className="border-1 border-black"></hr>
                          {members.map((item, index) => {
                            return (
                              <li
                                key={index}
                                onClick={(e) => handleClick(e, item)}
                                className="cursor-pointer pl-2 hover:bg-gray-200"
                              >
                                {item.memberId.fullName}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button className="text-md absolute bottom-20 left-10 h-10 w-32 bg-[#1D3557] text-white" onClick={resolveTicket}>
                Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
