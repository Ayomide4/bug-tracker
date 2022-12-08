import React from 'react'
import { projects, projectList } from '../tempData'
import ProjectItem from './ProjectItem'

export default function Projects() {
const ProjectDesciptors = ['Project', 'Description', 'Team', 'Last Updated']

  const projectItems = 
    projects.map((entry, index:number) => {
      return (
        <li key={index} className='list-none w-full'>
          <ProjectItem name={entry.name} desc={entry.desc} team={entry.team} lastUpdated={entry.lastUpdated}/>
        </li>
      )
    })



  return (
    <div className='border relative mb-20  border-[#2A6470] rounded-lg w-11/12 mx-12 shadow-outline h-3/4 bg-white'>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl text-[#1D3557]'>Projects</h2>
        <button className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Project</button>
      </div>
      <div className='flex justify-between px-4 bg-gray-100 border '>
        {ProjectDesciptors.map((item, index) => {
          return(
            <h2 className='py-2 text-gray-500' key={index}>{item}</h2>
          )
        })}
      </div>
      <div className='flex flex-col justify-center px-4 pt-2'>
        {projectItems}
      </div>
    </div>
  )
}
