import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateTeam from './CreateTeam'
import Team from './Team'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'


export default function Teams() {
  //get login info
  const login = useLogin()

  //trigger that renders create team or the team page
  const [trigger, setTrigger] = useState<boolean>(false)

  
    //retrieve state from local storage into user obj
  const temp:any = localStorage.getItem("login state")
  const user:any = JSON.parse(temp)
  let isAdmin = user.isAdmin
  console.log(login?.loginInfo)




  return (
    <div className='w-full h-full'>
      {!trigger && !isAdmin ? <CreateTeam trigger={trigger} setTrigger={setTrigger}/>: <Team trigger={trigger}/>}
    </div>
  )
}
