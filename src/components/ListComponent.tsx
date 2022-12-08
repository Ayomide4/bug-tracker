import React from 'react'

export default function ListComponent(props:any) {
  const ProjectDesciptors = ['Project', 'Description', 'Members', 'Last Updated']
  
  console.log(props.categories)
  return (
    <div className={`border relative  border-[#2A6470] rounded-lg shadow-outline h-full w-full bg-white`}>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl text-[#1D3557]'>{props.title}</h2>
        <button className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New {props.btn}</button>
      </div>
      <div className='flex justify-between px-4 bg-gray-100 border '>
        {props.categories.map((item:any, index:number) => {
          return(
            <h2 className='py-2 text-gray-500' key={index}>{item}</h2>
          )
        })}
      </div>

    </div>
  )
}
