import React from 'react'
import { Navbar } from '../components/Navbar'
import Projects from '../components/Projects'


export default function ProjectPage() {
  return (
    <div className='max-w-full h-screen flex p-0 m-0'>
      <Navbar/>
      <div className='flex flex-col justify-between w-5/6 max-h-screen bg-[#F2F5FA] '>
        <h1 className='ml-6 mt-6 font-semibold text-2xl'>Your Projects</h1>
        <Projects/> 
    </div>
    </div>
    
  )
}
