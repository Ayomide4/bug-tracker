import {data01} from '../../tempData'
import DashboardStatus from './DashboardStatus'
import DashboardProjectsInfo from './DashboardProjectsInfo'
import { useEffect } from 'react'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'
import axios from 'axios'


export const Dashboard = () => {

  const login = useLogin()
  let sum:number = data01.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0)


  const id = login?.loginInfo._id
  useEffect(() => {
    axios.get(`http://localhost:3002/user/${id}`)
      .then((response) => {
        console.log('response ', response.data)
        localStorage.setItem("login state", JSON.stringify(response.data))
      })
    },[])
    
  return (
    <div className='w-5/6 h-full bg-[#F4F6F6] flex flex-col'>
      <DashboardStatus />
      <DashboardProjectsInfo sum={sum}/>  
    </div>
  )
}
