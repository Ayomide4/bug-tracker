import React from 'react'
import { projects, projectList } from '../tempData'
import ProjectItem from './ProjectItem'

export default function Projects() {




  return (
    <div className='border mb-20 relative border-[#2A6470] rounded-lg w-11/12 mx-12 shadow-outline h-3/4  bg-white '>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl text-[#1D3557]'>Projects</h2>
        <button className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Project</button>
      </div>
        <ProjectItem/>
    </div>
  )
}
