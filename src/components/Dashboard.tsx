import React from 'react'
import Projects from './Projects'


export const Dashboard = () => {
  return (
    <div className='w-full h-full'>
      <h2 className='text-3xl font-medium text-[#1f4b54] m-6'>Dashboard</h2>

      <div className="grid grid-cols-4 gap-4 max-w-full">
        <div className='bg-black h-60'></div>
        <div className='bg-black h-60'></div>
        <div className='bg-black h-60'></div>
        <div className='bg-black h-60'></div>
      </div>
    </div>
  )
}
