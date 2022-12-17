import { useState } from 'react'
import ProjectItem from './ProjectItem'

import axios from 'axios'
import CreateProject from './CreateProject'

export default function Projects() {
  
  const [projectInfo, setProjectInfo] = useState({
    title: "",
  })

  const [trigger, setTrigger] = useState(false)

  const handleClick = () => {

    setTrigger(trigger => !trigger) 
    // const newProject = {
      //   title: "project one test"
      // }
      
      // axios.post("http://localhost:3002/create", newProject)
    }


  return (
    <div className='border mb-20 relative border-[#2A6470] rounded-lg w-11/12 mx-12 shadow-outline h-3/4  bg-white '>
      <CreateProject trigger={trigger} closeModal={handleClick}/>
      <div className=''>
        <div className='flex justify-between p-4 '>
          <h2 className='text-xl text-[#1D3557]'>Projects</h2>
          <button onClick={handleClick} className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Project</button>
        </div>
          <ProjectItem/>
      </div>
    </div>
  )
}
