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
      if(!id){
        const temp:any = localStorage.getItem("login state")
        const obj = JSON.parse(temp)
        let newId = obj._id

        axios.get(`http://localhost:3002/user/${newId}`)
          .then((response) => {
            localStorage.setItem("login state", JSON.stringify(response.data))
            login?.setLoginInfo({...response.data})
            // console.log('refresh response', response.data)
          })
          .catch(error => {
            console.log('error')
          })
      }
      if(id){
        axios.get(`http://localhost:3002/user/${id}`)
          .then((response) => {
            //console.log('response ', response.data)
            localStorage.setItem("login state", JSON.stringify(response.data))
            login?.setLoginInfo({...response.data})
            // console.log('dash login',login?.loginInfo)
            // console.log('dash response',response.data)
          })
          .catch(error => {
            console.log('to')
            console.log(error.data)
          })
      }
    },[])
    
  return (
    <div className='md:w-5/6 h-full bg-[#F4F6F6] flex flex-col w-full'>
      <DashboardStatus />
      <DashboardProjectsInfo sum={sum}/>  
    </div>
  )
}
