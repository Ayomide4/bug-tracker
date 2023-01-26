import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateTeam from './CreateTeam'
import Team from './Team'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'


export default function Teams() {
  //get login info
  const login = useLogin()

  //trigger that renders create team or the team page
  const [trigger, setTrigger] = useState<boolean>(true)
  
  //retrieve state from local storage into user obj
  
  const temp:any = localStorage.getItem("login state")
  const user:any = JSON.parse(temp)
  const [myTeamName, setMyTeamName] = useState(undefined)
  const [hasLoaded, setHasLoaded] = useState(false)
  let isAdmin = user.isAdmin



  if(user){
    if(user.teams > 0){
      setMyTeamName(user.teams[0])
    }
  }


  return (
    <div className='w-full h-full'>
      {!trigger && !isAdmin ? <CreateTeam trigger={trigger} setTrigger={setTrigger}/>: <Team  trigger={trigger} myTeamName={myTeamName} setMyTeamName={setMyTeamName} hasLoaded={hasLoaded} setHasLoaded={setHasLoaded}/>}
    </div>
  )
}
