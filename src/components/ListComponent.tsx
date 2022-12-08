import React from 'react'

export default function ListComponent() {
  const ProjectDesciptors = ['Project', 'Description', 'Members', 'Last Updated']

  return (
    <div className='border relative mb-20  border-[#2A6470] rounded-lg w-full mx-12 shadow-outline  bg-white'>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl text-[#1D3557]'>Projects</h2>
        <button className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Project</button>
      </div>
      <div className='flex justify-between px-4 bg-gray-100 border '>
        {ProjectDesciptors.map((item, index) => {
          return(
            <h2 className='py-2 text-gray-500' key={index}>{item}</h2>
          )
        })}
      </div>
    </div>
  )
}
