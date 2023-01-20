import {data01} from '../../tempData'
import DashboardStatus from './DashboardStatus'
import DashboardProjectsInfo from './DashboardProjectsInfo'
import { useEffect } from 'react'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'
import axios from 'axios'


export const Dashboard = () => {

  const login = useLogin()
  let user:any = {}
  let sum:number = data01.reduce((accumulator, object) => {
    return accumulator + object.value;
  }, 0)

  // useEffect(()=>{
  //   //console.log('login ifo dashboard',login?.loginInfo)
  //   const id = login?.loginInfo.id
  //   //localStorage.setItem("login state", JSON.stringify(login?.loginInfo))
  //   axios.get(`http://localhost:3002/user/${id}`)
  //     .then((response) => {
  //       //console.log('inside get call dash',response.data)
  //       localStorage.setItem("login state", JSON.stringify(response.data))
  //       user = response.data
  //     })
  //     .catch((error) => {
  //       console.log(error.data)
  //     })
  // }, [])


  useEffect(() => {
    const user:any = localStorage.getItem("login state")
    
    //if there's nothing in local storage
    if(!user){
      const id = login?.loginInfo.id
      axios.get(`http://localhost:3002/user/${id}`)
        .then((response) => {
          //console.log(response.data)
          localStorage.setItem("login state", JSON.stringify(response.data))
          login?.setLoginInfo({...response.data, _id: login.loginInfo.id})
        })
    }

    login?.setLoginInfo(JSON.parse(user))
    console.log('state is ', login?.loginInfo)
    },[])
    
    console.log('THIS IS LOGIN INFO GLOBaL ',login?.loginInfo)
  return (
    <div className='w-5/6 h-full bg-[#F4F6F6] flex flex-col'>
      <DashboardStatus />
      <DashboardProjectsInfo sum={sum}/>  
    </div>
  )
}
