import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateTeam from './CreateTeam'
import Team from './Team'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'


export default function Teams() {
  //get login info
  const login = useLogin()
  let isAdmin  = false
  
    //retrieve state from local storage into user obj
  const user:any = localStorage.getItem("login state")
  if(user){
    const temp = JSON.parse(user)
    //get id and isAdmin from local storage
    isAdmin = temp.isAdmin
  }

  //trigger that renders create team or the team page
  const [trigger, setTrigger] = useState<boolean>(false)



  return (
    <div className='w-full h-full'>
      {!trigger ? <CreateTeam trigger={trigger} setTrigger={setTrigger}/>: <Team trigger={trigger}/>}
    </div>
  )
}
