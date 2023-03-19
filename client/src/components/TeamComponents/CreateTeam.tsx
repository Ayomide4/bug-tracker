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


export default function CreateTeam({trigger, setTrigger, isModalOpen, setIsModalOpen} : Props) {
  
  const handleClick = () => {
    setIsModalOpen((prev) => !prev)

  }

  return (
    <>
      <>
        <h1 className='ml-6 mt-6 font-semibold text-2xl text-[#1D3557] mb-8'>Teams</h1>
        <h1 className='text-xl h-32 text-center'>Create your team to see more!</h1>
        <button className='absolute top-5 right-5 md:top-10 md:right-10 bg-[#1D3557] rounded-lg w-36 h-12 text-white ' onClick={handleClick}>Create Team</button>
      </>

      {isModalOpen && 
        <CreateTeamModal setTrigger={setTrigger} setIsModalOpen={setIsModalOpen}/>
      }
    </>
    
  )
}
