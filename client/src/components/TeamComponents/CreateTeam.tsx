import React, { FormEvent, useState, useCallback } from 'react'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'
import axios from 'axios'
import Team from './Team'
import CreateTeamModal from './CreateTeamModal'


interface Props {
  trigger: boolean
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// type teamType = {
//   title: string,
//   manager: any
// }

export default function CreateTeam({trigger, setTrigger, isModalOpen, setIsModalOpen} : Props) {
  // const temp:any = localStorage.getItem('login state')
  // const obj:any = JSON.parse(temp)
  // const name = `${obj.firstName} ${obj.lastName}`


  // const [team, setTeam] = useState<teamType>({
  //   title: '',
  //   manager: name
  // })

  // const handleChange = (e: any) => {
  //   setTeam({...team, title: e.target.value})
  // }

  // const handleSubmit = useCallback( (e: FormEvent) => {
  //   e.preventDefault()
    
  //   //gets user obj
  //   axios.patch(`http://localhost:3002/user/teams/${obj._id}`, {title: team.title})
  //   .then((response) => {
  //     let obj = {...response.data}
  //     console.log('obj response', obj)
  //     console.log('team ', team)
  //     localStorage.setItem("login state",JSON.stringify(obj))
  //     setTrigger((prev) => !prev)
  //   })
  //   .catch((error) => {
  //     console.log(error.data)
  //   }) 
  // },[team])

  
  const handleClick = () => {
    setIsModalOpen((prev) => !prev)
  }

  return (
    <>
      <>
        <h1 className='ml-6 mt-6 font-semibold text-2xl text-[#1D3557] mb-8'>Teams</h1>
        <h1 className='text-xl h-32 text-center'>You are not in any teams</h1>
        <button className='absolute top-10 right-10 bg-[#1D3557] rounded-lg w-36 h-12 text-white ' onClick={handleClick}>Create Team</button>
      </>

      {isModalOpen && 
        <CreateTeamModal setTrigger={setTrigger} setIsModalOpen={setIsModalOpen}/>
      }
    </>
    
  )
}
