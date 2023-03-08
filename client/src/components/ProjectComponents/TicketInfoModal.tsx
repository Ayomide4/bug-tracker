import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

type Props = {
  ticketData: {
    title: string;
    desc: string;
    dev: string;
    prio: string;
  };
  members: [{
    memberId: {
      fullName: string;
    }
  }]
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const prioColors = ["lowPrio", "medPrio", "highPrio"];

export default function TicketInfoModal({
  ticketData,
  isModalOpen,
  setIsModalOpen,
  members,
}: Props) {
  let index: number = 0;

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen((prev: boolean) => !prev);
  };

  if (ticketData.prio == "Low") {
    index = 0;
  } else if (ticketData.prio === "Medium") {
    index = 1;
  } else if (ticketData.prio === "High") {
    index = 2;
  }

  console.log('clicked modal',members)

  

  return (
    <>
      {isModalOpen && (
        <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
          <div className="relative h-3/5 w-2/5 bg-white">
            <div className="h-full border border-black p-4">
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
                  <label className="text-lg font-semibold text-[#1D3557]">Ticket Developer:</label>
                  <div className="border border-gray-500 w-40 select-none ml-2 rounded-sm">
                    <div className="flex justify-between items-center" onClick={() => setIsClicked(prev => !prev)}>
                      <div className="ml-2">Dev</div>
                      <div className="mr-2">
                        {!isClicked && <AiOutlineRight/>}
                        {isClicked && <AiOutlineLeft/>}
                      </div>
                    </div>
                    <div>{ isClicked &&
                      <ul>
                        {members.map((item, index) => {
                          return (
                            <li key={index}>
                              {item.memberId.fullName}
                            </li>
                          )
                        })}
                      </ul>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
