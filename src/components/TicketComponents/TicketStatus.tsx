import React from 'react'
import ProgressBar from 'react-animated-progress-bar'





export default function TicketStatus() {

  let percentage:number = 12

  return (
      <div className="grid grid-cols-3 gap-6 w-11/12 mx-4 mt-6">
        <div className='bg-white h-48 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>0</h2>
            <h2 className='text-center text-gray-500 text-md'>Total Tickets</h2>
        </div>
        <div className='bg-white h-48 rounded-lg shadow-md flex flex-col justify-center items-center'>
        <div className='h-24 w-24 mt-4 mb-2 '>
          <ProgressBar
            width="200px"
            height="10px"
            fontColor="black"
            trackWidth="18"
            percentage= {percentage}
            trackPathColor="#F4F6F6"
            trackBorderColor="white"
            defColor={{
              fair: 'green',
              good: 'green',
              excellent: 'green',
              poor: 'green',
            }}
          />
          </div>
            <h2 className='text-black text-2xl text-center font-bold'>10</h2>
            <h2 className='text-center text-gray-500 text-md mb-4'>Status: Open</h2>
        </div>
        <div className='bg-white h-48 rounded-lg shadow-md flex flex-col justify-center items-center'>
        <div className='h-24 w-24 mt-4 mb-2 '>
          <ProgressBar
            width="200px"
            height="10px"
            fontColor="black"
            trackWidth="18"
            percentage= {percentage}
            trackPathColor="#F4F6F6"
            trackBorderColor="white"
            defColor={{
              fair: '#457B9D',
              good: '#457B9D',
              excellent: '#457B9D',
              poor: '#457B9D',
            }}
          />
          </div>
            <h2 className='text-black text-2xl text-center font-bold'>2</h2>
            <h2 className='text-center text-gray-500 text-md mb-2'>Status: Development</h2>
        </div>
        
    </div>
  )
}
