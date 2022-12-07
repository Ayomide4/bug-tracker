import React from 'react'
import Projects from './Projects'
import {PieChartComp} from './PieChart'
import {data01, projectList} from '../tempData'
import {RxDoubleArrowRight} from 'react-icons/rx'


export const Dashboard = () => {

  const sum = data01.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0)


  return (
    <div className='w-full h-full bg-[#F4F6F6]'>
      <h2 className='text-3xl font-medium text-[#1D3557] mx-6 mt-6 mb-10'>Dashboard</h2>
      <div className="grid grid-cols-4 gap-4 max-w-full mx-4 pt-5">
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

      {/* second row */}

      <div className='mt-10 mx-4 grid grid-rows-2 grid-cols-3 gap-4 h-72'>
        <div className=' bg-white rounded-md row-span-2 p-4 shadow-md'>
          <h2 className='text-xl font-semibold text-center'>Projects Priority</h2>
          <PieChartComp data={data01}/> 
          <div className="flex w-full justify-evenly">
            

              {data01.map((entry, index)=>{
                return (
                <div className='flex flex-col justify-center items-center' key={index}>
                  <h2 className='font-semibold'>{entry.name}</h2>
                  <h2>{`${(entry.value/sum).toFixed(2)}%`}</h2>
                </div>
                )
              })}
          </div>
        </div>
        <div className=' bg-white rounded-md row-span-2 shadow-md'>
          <h2 className='text-xl text-center font-semibold p-4'>Your Projects</h2>
          <div className='flex flex-col px-8'>
            {projectList.map((entry:string, index:number) => {
              return (
                <li key={index} className='list-none mb-2'>
                  <a href='#' className='decoration-none'>{entry}</a>
                </li>
              )
            })}
            <div className=''>
              <a href='/projects' className='text-blue-800 font-semibold text-md mt-6 flex justify-end items-center'>
                <h2 className='mr-2'>more projects</h2>
                <RxDoubleArrowRight size={20} color='#1F41AF'/>
              </a>
            </div>

          </div>
        </div>
        <div className='bg-white rounded-md row-span-2 shadow-md'></div>
      </div>      
    </div>
  )
}
