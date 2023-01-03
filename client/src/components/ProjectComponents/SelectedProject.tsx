import React, { useState } from 'react'
import {FaArrowLeft} from 'react-icons/fa'
//maybe should make this a shared component with ticket

type info = {
  title: string,
  desc: string,
  manager: string,
  team: string,
  status: string
}
export default function SelectedProject(props:any) {
  

  return (
    <div className='w-full h-full'>
      <div className='flex items-center mt-6 ml-4 cursor-pointer  w-44' onClick={() => {props.isSelected(prev => !prev)}}>
        <FaArrowLeft color='#1D3557' size={22} />
        <h1 className='text-xl font-bold text-[#1D3557] ml-1'>Project Details</h1>  
      </div>

      <div className='flex justify-between h-3/4'>
        <div className='flex flex-col mx-6 h-full w-1/3 mt-6'>
          <div className='mb-4 border border-[#2A6470] rounded bg-white w-full h-40'>
            <h1 className=' mx-2 text-lg text-[#1D3557] font-semibold'>{props.selectedInfo.title}</h1>
            <p className='mx-4 mb-4'>{props.selectedInfo.desc}</p>
          </div>  
          <div className='w-full h-40 mb-4 mt-6 bg-white border border-[#2A6470] rounded '>
            <div className='flex justify-between items-center mx-4 my-4'>
              <h1 className='text-lg'>Created: </h1>
              <h1 className='text-lg'>Jan 02, 2023</h1>
            </div>
            <div className='flex justify-between items-center mx-4 my-4'>
              <h1 className='text-lg'>Deadline: </h1>
              <h1 className="text-lg">Jan 31, 2023</h1>
            </div>
            <div className='flex justify-between items-center mx-4'>
              <h1 className='text-lg'>Status</h1>
              <h1 className='text-lg'>{props.selectedInfo.status}</h1>
            </div>
          </div>
          <div className='border border-[#2A6470] bg-white w-full h-52 mt-4 rounded'>
            <h1 className=' mx-2 text-lg text-[#1D3557] font-semibold mb-2'>Team - {props.selectedInfo.team}</h1>
            {/*Team list component maybe */}
            <table className='border border-black w-full border-x-0'>
              <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className='text-left'>
                <tr>
                  <td>Ayo Omotosho</td>
                  <td>aomotosho4@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='w-2/3 h-full bg-white rounded mt-6 mr-6 border border-[#2A6470]'>
          <div className='mt-2'>
            <h1 className='mx-2 text-lg text-[#1D3557] font-semibold mb-2'>Tickets</h1>
            <table className='border border-x-0 border-black w-full'>
                <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Developer</th>
                  </tr>
                </thead>
                <tbody className='text-left'>
                  <tr>
                    <td>Ticket Title</td>
                    <td>A bug I cant figure out</td>
                    <td>High</td>
                    <td>Ayo Omotosho</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  )
}
