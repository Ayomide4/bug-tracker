import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateTeam from './CreateTeam'
import Team from './Team'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'


export default function Teams() {
  //get login info
  const login = useLogin()
  const isAdmin = login?.loginInfo.isAdmin
  
  //retrieve state from localStorage
  const getLocalState:any = localStorage.getItem('login state')
  const localState: any = JSON.parse(getLocalState)

  //trigger that renders create team or the team page
  const [trigger, setTrigger] = useState<boolean>(false)

  //let user:any = {}
  // useEffect(()=>{
  //   const id = login?.loginInfo._id
  //   axios.get(`http://localhost:3002/user/${id}`)
  //     .then((response) => {
  //       localStorage.setItem("login state", JSON.stringify(response.data))
  //       console.log(`get response : ${JSON.stringify(user)}`)
  //     })
  //     .catch((error) => {
  //       console.log(error.data)
  //     })
  // }, [trigger])

  console.log(`is admin is ${isAdmin}`)

  return (
    <div className='w-full h-full'>
      {isAdmin || trigger ? <Team/> :  <CreateTeam trigger={trigger} setTrigger={setTrigger}/>}
    
    </div>
  )
}
