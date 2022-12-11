import React from 'react'
import { projects } from '../tempData'

export default function ProjectItem(props:any) {

    const displayItems = 
    projects.map((entry, index:number) => {
      return (
        <tr className='cursor-pointer hover:bg-gray-200 ' key={index}>
          <td className='pl-4 text-lg'>{entry.title}</td>
          <td className='text-lg'>{entry.desc}</td>
          <td className='text-lg'>{entry.manager}</td>
          <td className='text-lg'>{entry.lastUpdated}</td>
          <td className='text-lg'>{entry.status}</td>
        </tr>
      )
    })

  return (
      <div className='min-w-full overflow-scroll max-h-96 flex-none'>
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
          <tbody className='text-left'>
            {displayItems}
          </tbody>
        </table>
      </div>
    )
  }
