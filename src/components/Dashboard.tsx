import React from 'react'
import Projects from './Projects'
import {PieChartComp} from './PieChart'
import data01 from '../tempData'


export const Dashboard = () => {
  return (
    <div className='w-full h-full bg-[#F4F6F6]'>
      <h2 className='text-3xl font-medium text-[#1D3557] mx-6 mt-6 mb-10'>Dashboard</h2>
      <div className="grid grid-cols-4 grid-rows-3 gap-4 max-w-full mx-4 pt-5">
        <div className='bg-[#E63946] h-40 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>0</h2>
            <h2 className='text-center text-black text-xl mb-2'>Active Projects</h2>
        </div>
        <div className='bg-[#457b9d] h-40 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>10</h2>
            <h2 className='text-center text-black text-xl mb-2'>Total Tickets</h2>
        </div>
        <div className='bg-[#A8DADC] h-40 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>2</h2>
            <h2 className='text-center text-black text-xl mb-2'>Assigned Tickets</h2>
        </div>
        <div className='bg-[#FFC211] h-40 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>0</h2>
            <h2 className='text-center text-black text-xl mb-2'>Unassigned Projects</h2>
        </div>

      {/* second row */}
      <div className='rounded-lg flex flex-col justify-center items-center row-span-2 bg-white m-0 p-0'>
        <h2 className='text-xl font-semibold'>Projects Priority</h2>
        <PieChartComp data={data01}/> 
        <div className="flex w-full justify-evenly">
          <h3>High</h3>
          <h3>Medium</h3>
          <h3>Low</h3>
        </div>
      </div>
      <div className='rounded-lg flex flex-col  items-center row-span-2 bg-white m-0 p-0 border border-black'>
        <h2 className='text-xl font-semibold'>Your Projects</h2>
      </div>
      </div>
    </div>
  )
}
