import axios from "axios";
import React, { FormEvent, useState } from "react";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";

function Edit(props: any) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>("Status");
  const [newDeadline, setNewDeadline] = useState<string>("");
  const [newInfo, setNewInfo] = useState(props.selectedInfo);
  const list = ["Active", "Inactive"];

  console.log(newInfo);

  const selectStatus = (e: any) => {
    const statusVal = e.target.getAttribute("value");
    console.log(statusVal);
    setNewInfo({ ...newInfo, status: statusVal });
    setIsExpanded((prev) => !prev);
  };

  const selectDeadline = (e: any) => {
    const tempDeadline: Date = new Date(e.target.value);
    setNewInfo({
      ...newInfo,
      deadline: new Date(
        tempDeadline.getTime() - tempDeadline.getTimezoneOffset() * -60000
      ).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
    });
  };

  const handleChange = (e: any) => {
    if (e.target.id === "title") {
      setNewInfo({ ...newInfo, title: e.target.value });
    }
    if (e.target.id === "desc") {
      setNewInfo({ ...newInfo, desc: e.target.value });
    }
    console.log(newInfo);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.setSelectedInfo(newInfo);
    axios.patch(`http://localhost:3002/project/${props.selectedInfo.id}`, {
      title: newInfo.title,
      deadline: newInfo.deadline,
      desc: newInfo.desc,
      status: newInfo.status,
    });
    console.log("submitted info", props.selectedInfo);
    props.toggleEdit();
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
      <div className="absolute md:relative top-12 md:top-0 h-3/4 w-4/5 bg-white md:py-20 opacity-100 md:w-3/5">
        <h1 className="absolute top-8 left-7 text-xl font-semibold md:top-10 md:left-10">
          Edit Project
        </h1>
        <button
          onClick={props.toggleEdit}
          className="absolute right-7 top-7 h-8 w-16 bg-[#1D3557] text-lg text-white md:h-10 md:w-20"
        >
          Close
        </button>
        <form
          onSubmit={handleSubmit}
          className="h-full w-full bg-white"
          autoComplete="off"
        >
          <div className=" h-fit w-full md:px-10 md:flex ">
            <div className="md:w-1/2">            
              <div className="mb-4 md:mb-6 mt-20 md:mt-0 flex flex-col mx-6 md:mx-0 ">
                <label className="mb-1 text-lg ">Title</label>
                <input
                  id="title"
                  onChange={handleChange}
                  value={newInfo.title}
                  maxLength={30}
                  className="w-full md:w-60 rounded-md border border-gray-500 p-2"
                  type="text"
                  placeholder="Enter a title"
                />
              </div>
              <div className="mb-4 md:mb-6 flex-col mx-6 md:mx-0 md:flex">
                <label className="mb-1 text-lg">Description</label>
                <textarea
                  id="desc"
                  onChange={handleChange}
                  value={newInfo.desc}
                  maxLength={150}
                  className=" h-32 md:h-40 w-60 resize-none border border-gray-500 pl-2 pt-2"
                  placeholder="Enter a description"
                />
                </div>
            </div>

            <div className="w-1/2">
              <div className="mb-4 md:mb-6 mx-6 md:mx-0 flex-col md:flex">
                <label className="mb-1 text-lg">Deadline</label>
                <input
                  id="deadline"
                  type="date"
                  className="w-60 rounded-md border border-gray-500 p-2"
                  onChange={(e) => selectDeadline(e)}
                />
              </div>
              <div className=" h-40 mx-6 md:mx-0 w-full">
                <label className="mb-1 text-lg">Status</label>
                <div
                  unselectable="on"
                  className="z-10 w-40 select-none rounded-sm border border-gray-500"
                >
                  <div
                    className="flex h-11 cursor-pointer items-center justify-between bg-white"
                    onClick={() => setIsExpanded((prev) => !prev)}
                  >
                    <div className="ml-2">{newStatus}</div>
                    <div className="mr-2">
                      {!isExpanded && <AiOutlineRight />}
                      {isExpanded && <AiOutlineDown />}
                    </div>
                  </div>
                  {isExpanded && (
                    <div>
                      <hr className="border-1 border-black"></hr>
                      <ul>
                        {list.map((item: string, index: number) => {
                          return (
                            <li
                              value={item}
                              key={index}
                              onClick={(e) => selectStatus(e)}
                              className="cursor-pointer bg-white p-1 hover:bg-blue-500 hover:text-white"
                            >
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="absolute left-6 md:left-10 md:bottom-32 bottom-10 h-12 w-36 bg-[#1D3557] text-lg text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
