import axios from "axios";
import React, { FormEvent, useState } from "react";

function Edit(props: any) {
  let [oldData, setOldData] = useState(props.selectedInfo)
  const newData = {...props.selectedInfo}

  const handleChange = (e: any) => {
    newData[e.target.id] = e.target.value
    props.setSelectedInfo(newData)
  };
  
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    axios.patch(`http://localhost:3002/project/${props.selectedInfo.id}`, {title: newData.title, desc: newData.desc})
    props.toggleEdit()
  }


  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
      <div className="relative h-3/4 w-3/5 bg-white p-20 opacity-100">
        <h1 className="absolute top-10 left-10 text-xl font-semibold">Edit Project</h1>
        <button
          onClick={props.toggleEdit}
          className="absolute right-8 top-8 h-10 w-20 bg-[#1D3557] text-lg text-white"
        >Close</button>
        <form
            onSubmit={handleSubmit}
            className="h-full w-full bg-white"
            autoComplete="off"
          >
            <div className="ml-4">
              <div className="mb-6 flex flex-col">
                <label className="mb-1 text-lg ">Title</label>
                <input
                  id="title"
                  onChange={handleChange}
                  value={props.selectedInfo.title}
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
                  onChange={handleChange}
                  value={props.selectedInfo.desc}
                  maxLength={150}
                  className="h-24 w-2/3 resize-none border border-gray-500 pl-2 pt-2"
                  placeholder="Enter a description"
                />
              </div>
              
              <button className="h-12 w-36 bg-[#1D3557] text-lg text-white">
                Save
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Edit;
