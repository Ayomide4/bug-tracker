import React from 'react'
import { PieChartComp } from '../PieChart'
import { data01, projectList, ticketList } from '../../tempData'
import { RxDoubleArrowRight } from 'react-icons/rx'


interface Props {
  sum:number,
  pieData: any
}

export default function DashboardProjectsInfo({sum, pieData}: Props) {

  


  return (
    <div className=' mt-4 md:mt-10 mx-4 grid grid-rows-2 grid-cols-1 md:grid-cols-3 gap-4 h-full md:h-72'>

      {/* Project Prio Comp */}
      <div className=' bg-white rounded-md row-span-full p-4 shadow-md'>
          <h2 className='text-xl font-semibold text-center'>Tickets Priority</h2>
          <PieChartComp data={data01}/> 
          <div className="flex w-full justify-evenly">
              {
                //Returns the high/med/low categories and percent of each category
                pieData.map((entry:any, index:number)=>{
                  return (
                  <div className='flex flex-col justify-center items-center' key={index}>
                    <h2 className='font-semibold'>{entry.name}</h2>
                    <h2>{`${(((entry.value/sum))*100).toFixed(2)}%`}</h2>
                  </div>
                  )
                })
              }
          </div>
        </div>

        {/* Your projects comp */}
        <div className=' bg-white rounded-md row-span-2 shadow-md'>
          <h2 className='text-xl text-center font-semibold p-4'>Your Projects</h2>
          <div className='flex flex-col px-8 '>
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

        {/* Assigned Tickets comp */}
        <div className='bg-white rounded-md row-span-2 shadow-md'>
          <h2 className='text-xl text-center font-semibold p-4'>Assigned Tickets</h2>
          <div className='flex flex-col px-8'>
            {ticketList.map((entry:string, index:number) => {
              return (
                <li key={index} className="list-none mb-2"><a href='#' className='decoration-none'>{entry}</a></li>
              )
            })}
          <div className=''>
              <a href='/tickets' className='text-blue-800 font-semibold text-md mt-6 flex justify-end items-center'>
                <h2 className='mr-2'>more tickets</h2>
                <RxDoubleArrowRight size={20} color='#1F41AF'/>
              </a>
          </div>
          </div>
        </div>
      </div>  
  )
}
