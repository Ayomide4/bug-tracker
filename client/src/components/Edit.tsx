import axios from "axios";
import React, { FormEvent, useState } from "react";
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

function Edit(props: any) {

  const [newInfo, setNewInfo] = useState(props.selectedInfo)
  console.log('new info', newInfo)
  const newData = { ...props.selectedInfo };


  const handleChange = (e: any) => {
    if(e.target.id === "title"){
      setNewInfo({...newInfo, title: e.target.value})
    }
    if(e.target.id === "desc"){
      setNewInfo({...newInfo, desc: e.target.value})
    }
    // newData[e.target.id] = e.target.value;
    //props.setSelectedInfo(newData);
    console.log(newInfo);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.setSelectedInfo(newInfo)
    axios.patch(`http://localhost:3002/project/${props.selectedInfo.id}`, {
      title: newInfo.title,
      desc: newInfo.desc,
    });
    console.log('submitted info', props.selectedInfo)
    props.toggleEdit();
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20">
      <div className="relative h-3/4 w-3/5 bg-white p-20 opacity-100">
        <h1 className="absolute top-10 left-10 text-xl font-semibold">
          Edit Project
        </h1>
        <button
          onClick={props.toggleEdit}
          className="absolute right-8 top-8 h-10 w-20 bg-[#1D3557] text-lg text-white"
        >
          Close
        </button>
        <form
          onSubmit={handleSubmit}
          className="h-full w-full bg-white"
          autoComplete="off"
        >
          <div className="ml-4 flex h-full">
            <div className="w-1/2">
              <div className="mb-6 flex flex-col">
                <label className="mb-1 text-lg ">Title</label>
                <input
                  id="title"
                  onChange={handleChange}
                  value={newInfo.title}
                  maxLength={30}
                  className="w-60 rounded-md border border-gray-500 p-2"
                  type="text"
                  placeholder="Enter a title"
                />
              </div>
              <div className="mb-6 flex flex-col">
                <label className="mb-1 text-lg">Description</label>
                <textarea
                  id="desc"
                  onChange={handleChange}
                  value={newInfo.desc}
                  maxLength={150}
                  className="h-60 w-60 resize-none border border-gray-500 pl-2 pt-2"
                  placeholder="Enter a description"
                />
              </div>
            </div>
            
            <div className="w-1/2">
              <div className="flex flex-col">
                <label className="mb-1 text-lg">Deadline</label>
                <input
                  id="deadline"
                  className="w-60 rounded-md border border-gray-500 p-2"
                />
              </div>
              <div>
                <label className="mb-1 text-lg">Status</label>
                
              </div>
            </div>


            <button className="absolute bottom-0 h-12 w-36 bg-[#1D3557] text-lg text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
