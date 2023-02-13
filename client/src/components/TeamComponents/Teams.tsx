import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateTeam from './CreateTeam'
import Team from './Team'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'
import SelectedProject from '../ProjectComponents/SelectedProject'

type infoType = {
  title: string,
  desc: string,
  manager: string,
  team: string,
  status: string,
  date: string,
  id: string,
  tickets: string[]
}

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
  const [isModalOpen, setIsModalOpen] = useState(false)



  //select project variables
  const [selected, setIsSelected] = useState<boolean>(true)
  const [selectedInfo, setSelectedInfo] = useState<infoType>({
    title: '',
    desc: '',
    manager: '',
    team: '',
    status: '',
    date: '',
    id: '',
    tickets: []
  })
  

  useEffect(()=>{
    const temp:any = localStorage.getItem("login state")
    const user:any = JSON.parse(temp)
    isAdmin = user.isAdmin
    console.log(`is admin ${isAdmin} trigger ${trigger}`)
    const teamLength:number = user.teams.length

    if(isAdmin){
      setTrigger(true)
    }

    else if(teamLength > 0 && !isAdmin){
      setMyTeamName(user.teams[0].team.teamName)
      setMember(true)
      setTrigger(true)
    }
  }, [])


  return (
    <div className='w-full h-full'>
      {!selected && <SelectedProject selectedInfo={selectedInfo} setSelectedInfo={setSelectedInfo} selected={selected} setIsSelected={setIsSelected}/>}
      { (!trigger && !isAdmin) ? <CreateTeam isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} trigger={trigger} setTrigger={setTrigger}/> : selected && <Team setIsSelected={setIsSelected} selected={selected} setIsModalOpen={setIsModalOpen} member={member} trigger={trigger} setTrigger={setTrigger} myTeamName={myTeamName} setMyTeamName={setMyTeamName} hasLoaded={hasLoaded} setHasLoaded={setHasLoaded}/>}
    </div>
  )
}
