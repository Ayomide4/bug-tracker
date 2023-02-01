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
  let isAdmin = false
  const [myTeamName, setMyTeamName] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)
  const [showCreateBtn, setShowCreateBtn] = useState(false)
  const [member, setMember] = useState<boolean>(false)

  
  useEffect(()=>{
    const temp:any = localStorage.getItem("login state")
    const user:any = JSON.parse(temp)
    isAdmin = user.isAdmin
    console.log(`is admin ${isAdmin} trigger ${trigger}`)
    const teamLength:number = user.teams.length

    if(teamLength > 0 && !isAdmin){
      setMyTeamName(user.teams[0].team.teamName)
      console.log()
      setMember(true)
      setTrigger(true)
    }
    setTrigger(true)
  }, [])


  return (
    <div className='w-full h-full'>
      {!trigger && !isAdmin ? <CreateTeam trigger={trigger} setTrigger={setTrigger}/>: <Team member={member} trigger={trigger} myTeamName={myTeamName} setMyTeamName={setMyTeamName} hasLoaded={hasLoaded} setHasLoaded={setHasLoaded}/>}
    </div>
  )
}
