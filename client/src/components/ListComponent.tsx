import React from 'react'
import { tickets } from '../tempData'

export default function ListComponent(props:any) {
  const ProjectDesciptors = ['Project', 'Description', 'Members', 'Last Updated']

  const displayItems = 
    tickets.map((entry, index:number) => {
      return (
        <tr className='cursor-pointer hover:bg-gray-200 ' key={index}>
          <td className='pl-4 text-lg'>{entry.title}</td>
          <td className='text-lg'>{entry.submittedBy}</td>
          <td className='text-lg'>{entry.status}</td>
          <td className='text-lg'>{entry.priority}</td>
          <td className='text-lg'>{entry.lastUpdated}</td>
        </tr>
      )
    })

  
  return (
    <div className={`border relative  border-[#2A6470] rounded-lg shadow-outline max-h-screen w-full bg-white`}>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl text-[#1D3557]'>Projects</h2>
        <button className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Project</button>
      </div>
      <div className='overflow-y-scroll max-h-96 '>
        <table className='w-full'>
            <thead className='text-[#707785] text-left'>
              <tr>
                <th className='py-3 bg-[#F3F4F6] sticky pl-4 top-0'>Project</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Description</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Project Manager</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Team</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Status</th>
              </tr>
            </thead>
            <tbody className='text-left '>
              {displayItems}
            </tbody>
        </table>
      </div>
    </div>
  )
}
