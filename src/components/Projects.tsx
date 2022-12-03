import React from 'react'

export default function Projects() {
  return (
    <div className='border relative mb-20  border-black rounded-lg w-11/12 mx-12 shadow-outline h-3/4 bg-white'>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl'>Projects</h2>
        <button className='border rounded-md bg-[#2A6470] p-2 text-white text-base' >New Project</button>
      </div>
      <div className='flex justify-between px-4 bg-gray-100 border '>
        <h2 className='py-2 text-gray-500'>Project</h2>
        <h2 className='py-2 text-gray-500'>Description</h2>
        <h2 className='py-2 text-gray-500'>Members</h2>
        <h2 className='py-2 text-gray-500'>Last Updated</h2>
      </div>
      
    </div>
  )
}
