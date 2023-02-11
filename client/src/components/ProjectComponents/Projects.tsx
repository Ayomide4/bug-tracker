import Project from "./Project";
import { useState, SetStateAction, FC } from "react";
import SelectedProject from "./SelectedProject";

export default function Projects() {
  const [selected, setIsSelected] = useState<boolean>(true);
  const [selectedInfo, setSelectedInfo] = useState({
    title: "yo",
    desc: "",
    manager: "",
    team: "",
    status: "",
    date: "",
    id: "",
  });

  return (
    <>
      {selected && (
        <h1 className="ml-6 mt-6 text-2xl font-semibold text-[#1D3557]">
          Your Projects
        </h1>
      )}
      <div className="flex h-full w-full flex-col items-center bg-[#F4F6F6]">
        {selected && (
          <Project
            selectedInfo={selectedInfo}
            setSelectedInfo={setSelectedInfo}
            selected={selected}
            setIsSelected={setIsSelected}
          />
        )}
        {!selected && (
          <SelectedProject
            selectedInfo={selectedInfo}
            setSelectedInfo={setSelectedInfo}
            selected={selected}
            setIsSelected={setIsSelected}
          />
        )}
      </div>
    </>
  );
}
