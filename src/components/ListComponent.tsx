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

  
  console.log(props.categories)
  return (
    <div className={`border relative  border-[#2A6470] rounded-lg shadow-outline h-full w-full bg-white overflow-y-scroll`}>
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
          <tbody className='text-left overflow-y-scroll'>
            {displayItems}
          </tbody>
        </table>
    </div>
  )
}
