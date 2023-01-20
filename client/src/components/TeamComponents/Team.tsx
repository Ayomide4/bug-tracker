import React, { useEffect, useState } from 'react'
import DropdownMenu from '../DropdownMenu'

export default function Team() {
  const teamsList = ['team 1', 'team 2', 'team 3']
  const [dropdownValue, setDropdownValue] = useState()
  const temp:any = localStorage.getItem("login state")
  const obj:any = JSON.parse(temp)


  useEffect(()=> {
    console.log('hello from team page')
  })

  return (
    <div className='z-10'>
    <h1 className='ml-6 mt-6 font-semibold text-2xl text-[#1D3557] mb-8'>Teams</h1>
        <div className='flex items-start justify-evenly mb-8 z-0'>

          {/* TEAM LIST */}
          <div className='w-5/12 h-80 bg-white border border-[#1D3557] shadow-sm rounded'>
            <div className='flex justify-between items-center py-2'>
              <h2 className=' text-xl font-semibold ml-2 text-[#1D3557]'>New Team</h2>
              <button className='w-32 mr-2 px-2 h-8 text-md bg-[#1D3557] text-white'>Add Member</button>  
            </div>
            <div className="border border-black border-b-0 border-x-0 w-full">
              <table className='w-full h-full'>
                <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                  <tr>
                    <th className='pl-2 w-full'>Members</th>
                  </tr>
                </thead>
                <tbody className='text-left'>
                  <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                  <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                  <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                  <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                  <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* PROJECT LIST */}

          <div className='border border-[#1D3557] shadow-sm rounded w-6/12 h-80 bg-white'>
            <div className='flex items-center justify-between w-full pt-2'>
              <h2 className='text-xl font-semibold px-2 mb-2 text-[#1D3557]'>Projects</h2>
              <div className='flex items-center pb-2'>
              <button  className='w-32 mr-2 px-2 h-8 text-md bg-[#1D3557] text-white'>Create Project</button>
              </div>
            </div>
            <div className='border border-black border-b-0 border-x-0 w-full'>
              <table className='w-full h-full'>
                <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                  <tr>
                    <th className='pl-2 w-1/2'>Title</th>
                    <th className='pl-2 w-1/2'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='cursor-pointer hover:bg-gray-200'>
                    <td className='px-2'>Bug Tracker Example</td>
                    <td className='px-2'>Active</td>
                  </tr>
                  <tr className='cursor-pointer hover:bg-gray-200'>
                    <td className='px-2'>Social Media Example</td>
                    <td className='px-2'>Active</td>
                  </tr>
                  <tr className='cursor-pointer hover:bg-gray-200'>
                    <td className='px-2'>Tiktok Example</td>
                    <td className='px-2'>Inactive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* TODO: TEAM COMMENTS PAGE */}
        <div className=' h-72 mx-8 bg-white rounded shadow-lg'>

        </div>
    </div>
  )
}
