import React from 'react'
import Projects from './Projects'


export const Dashboard = () => {
  return (
    <div className='flex flex-col justify-between w-5/6 max-h-screen bg-[#F2F5FA] '>
        <h1 className='ml-6 mt-6 font-semibold text-2xl'>Dashboard</h1>
        <Projects/> 
    </div>
  )
}
