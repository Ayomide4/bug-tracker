import React from 'react'
import { Navbar } from '../components/Navbar'
import Projects from '../components/ProjectComponents/Projects'


export default function ProjectPage() {
  return (
    <div className='max-w-full h-screen flex p-0 m-0 bg-[#F4F6F6]'>
      <Navbar/>
      <div className='flex flex-col justify-between w-5/6 max-h-screen bg-[#F2F5FA] '>
        
        <Projects/> 
    </div>
    </div>
    
  )
}
