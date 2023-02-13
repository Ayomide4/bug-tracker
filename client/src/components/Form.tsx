import DropdownMenu from "./DropdownMenu";
import { useEffect, useState } from "react";

export default function Form(props: any) {
  const [dropdownValue, setDropdownValue] = useState({
    prio: "",
    status: "New",
  });
  const prioList: string[] = ["Low", "Medium", "High"];
  const newData: any = { ...props.formData };

  //TODO : ADD PROJECT INPUT BAR IN TICKET FORM

  const handleChange = (e: any) => {
    newData[e.target.id] = e.target.value; //looks for id that matches new data and saves the value at the id
    if (props.itemType === "project") {
      props.setFormData((newData["status"] = "active")); //default for project statsu
    }
    props.setFormData(newData); //sets formdata to new data from form
    // console.log(newData);
  };

  useEffect(() => {
    newData["prio"] = dropdownValue["prio"];
    newData["status"] = dropdownValue["status"];
    props.setFormData(newData);
  }, [dropdownValue]);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
      <div className="relative h-3/4 w-3/5 bg-white p-20 opacity-100">
        <button
          onClick={props.closeModal}
          className="absolute right-8 top-8 h-10 w-20 bg-[#1D3557] text-lg text-white"
        >
          Close
        </button>
        {props.itemType === "project" ? (
          // PROJECT FORM
          <form
            onSubmit={props.handleSubmit}
            className="h-full w-full bg-white"
            autoComplete="off"
          >
            <div className="ml-4">
              <div className="mb-6 flex flex-col">
                <label className="mb-1 text-lg ">Title</label>
                <input
                  id="title"
                  onChange={(e) => handleChange(e)}
                  value={props.formData.title}
                  maxLength={30}
                  className="w-2/3 rounded-md border border-gray-500 p-2"
                  type="text"
                  placeholder="Enter a title"
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label className="mb-1 text-lg">Description</label>
                <textarea
                  id="desc"
                  onChange={(e) => handleChange(e)}
                  value={props.formData.desc}
                  maxLength={150}
                  className="h-24 w-2/3 resize-none border border-gray-500 pl-2 pt-2"
                  placeholder="Enter a description"
                />
              </div>
              <div className="mb-8 flex flex-col">
                <label className="mb-1 text-lg">Team</label>
                <input
                  id="team"
                  onChange={(e) => handleChange(e)}
                  value={props.formData.team}
                  maxLength={30}
                  className="w-2/3 rounded-md border border-gray-500 p-2"
                  type="text"
                  placeholder="Enter your team's name"
                />
              </div>
              <button className="h-12 w-36 bg-[#1D3557] text-lg text-white">
                Create Project
              </button>
            </div>
          </form>
        ) : (
          // TICKET FORM
          <form
            onSubmit={props.handleSubmit}
            className="h-full w-full bg-white"
            autoComplete="off"
          >
            <div className="ml-4">
              <div className="mb-6">
                <div className="w-96">
                  <div className="top-16 z-10 mt-1 flex flex-col ">
                    <label className="mb-1 text-lg">Title</label>
                    <input
                      id="title"
                      onChange={(e) => handleChange(e)}
                      value={props.formData.title || ""}
                      maxLength={20}
                      className="w-72 rounded-md border border-gray-500 p-2"
                      type="text"
                      placeholder="Enter a title"
                    />
                  </div>
                  <div className="top-44 z-0 mt-6 flex flex-col">
                    <label className="mb-1 text-lg">Description</label>
                    <textarea
                      id="desc"
                      onChange={(e) => handleChange(e)}
                      value={props.formData.desc || ""}
                      maxLength={140}
                      className="h-32 w-72 resize-none border border-gray-500 pl-2 pt-2 "
                      placeholder="Enter a description"
                    />
                  </div>
                  <div className="top-96 mt-6 flex flex-col ">
                    <label className="mb-1 text-lg">Project</label>
                    <input
                      id="project"
                      onChange={(e) => handleChange(e)}
                      value={props.formData.project || ""}
                      maxLength={30}
                      className="w-72 rounded-md border border-gray-500 p-2"
                      placeholder="Enter team name"
                    />
                  </div>
                </div>
                <div>
                  <div className=" absolute right-20 top-20 z-20 mr-32 mb-20 h-12">
                    <DropdownMenu
                      listType="prio"
                      dropdownValue={dropdownValue}
                      setDropdownValue={setDropdownValue}
                      list={prioList}
                      title={"Priority"}
                    />
                  </div>
                </div>
              </div>
              <button className="absolute bottom-14 h-12 w-36 bg-[#1D3557] text-lg text-white">
                Create Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
