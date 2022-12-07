import React from 'react'
import Projects from '../Projects'
import {PieChartComp} from '../PieChart'
import {data01} from '../../tempData'
import DashboardStatus from './DashboardStatus'
import DashboardProjectPrio from './DashProjectsInfo'


export const Dashboard = () => {

  const sum:any = data01.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0)


  return (
    <div className='w-5/6 h-full bg-[#F4F6F6]'>
      <DashboardStatus/>
      <DashboardProjectPrio sum={sum}/>  
    </div>
  )
}
