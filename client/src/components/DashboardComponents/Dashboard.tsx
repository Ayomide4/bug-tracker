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

  //console.log(`login is ${login?.loginInfo}`)

  useEffect(() => {
    const temp:any = localStorage.getItem('login state')
    const user:any = JSON.parse(temp)
    const id = login?.loginInfo._id
    console.log('id', id)
  

    axios.get(`http://localhost:3002/user/${id}`)
      .then((response) => {
        console.log('response ', response.data)
        localStorage.setItem("login state", JSON.stringify(response.data))
      })




    

    // login?.setLoginInfo(JSON.parse(user))
    // //console.log('state is ', login?.loginInfo)
    },[])
    
    //console.log('THIS IS LOGIN INFO GLOBaL ',login?.loginInfo)
  return (
    <div className='w-5/6 h-full bg-[#F4F6F6] flex flex-col'>
      <DashboardStatus />
      <DashboardProjectsInfo sum={sum}/>  
    </div>
  )
}
