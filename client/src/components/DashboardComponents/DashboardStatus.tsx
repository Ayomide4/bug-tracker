
import React from 'react'

export default function DashboardStatus() {
  return (
    <div>
      <h2 className='text-3xl font-medium text-[#1D3557] mx-6 mb-10 mt-6'>Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 max-w-full mx-4 ">
        <div className='bg-[#E63946] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>0</h2>
            <h2 className='text-center text-black text-xl mb-2'>Active Projects</h2>
        </div>
        <div className='bg-[#457b9d] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>10</h2>
            <h2 className='text-center text-black text-xl mb-2'>Total Tickets</h2>
        </div>
        <div className='bg-[#A8DADC] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>2</h2>
            <h2 className='text-center text-black text-xl mb-2'>Assigned Tickets</h2>
        </div>
        <div className='bg-[#FFC211] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>0</h2>
            <h2 className='text-center text-black text-xl mb-2'>Unassigned Projects</h2>
        </div>
      </div>
    </div>
  )
}
