import {data01} from '../../tempData'
import DashboardStatus from './DashboardStatus'
import DashboardProjectsInfo from './DashboardProjectsInfo'


export const Dashboard = () => {


  let sum:number = data01.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0)


  return (
    <div className='w-5/6 h-full bg-[#F4F6F6] flex flex-col'>
      <DashboardStatus />
      <DashboardProjectsInfo sum={sum}/>  
    </div>
  )
}
