import React from 'react'
import { PieChartComp } from '../PieChart'
import { data01, projectList } from '../../tempData'
import { RxDoubleArrowRight } from 'react-icons/rx'

export default function DashboardProjectPrio(props:any) {
  return (
    <div className='mt-10 mx-4 grid grid-rows-2 grid-cols-3 gap-4 h-72'>
      <div className=' bg-white rounded-md row-span-2 p-4 shadow-md'>
          <h2 className='text-xl font-semibold text-center'>Projects Priority</h2>
          <PieChartComp data={data01}/> 
          <div className="flex w-full justify-evenly">
              {
                //Returns the high/med/low categories and percent of each category
                data01.map((entry, index)=>{
                  return (
                  <div className='flex flex-col justify-center items-center' key={index}>
                    <h2 className='font-semibold'>{entry.name}</h2>
                    <h2>{`${(entry.value/props.sum).toFixed(2)}%`}</h2>
                  </div>
                  )
                })
              }
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
  )
}
