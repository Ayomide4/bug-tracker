import React, { FormEvent, useState } from 'react'

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateTeam({setTrigger} : Props) {
  const [teamName, setTeamName] = useState<string>('')
  
  const handleChange = (e: any) => {
    setTeamName(e.target.value)
    console.log(teamName)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Team name: ',teamName)
    setTeamName('')
    setTrigger(false)
  }

  return (
    <div className='h-full bg-black bg-opacity-20 flex justify-center items-center'>
      <div className='relative p-10 w-3/5 h-2/5 bg-white opacity-100'>
        <form onSubmit={e=> handleSubmit(e)} className=''>
          <div className='flex flex-col mb-4'>
            <p className='text-center mb-12 text-lg'>You need to create a team to access the admin page</p>
            <div className='flex items-center'>
              <label className='text-xl mb-1'>Team Name</label>
              <input id='teamName' onChange={e => handleChange(e)} value={teamName} className='border border-black w-52 ml-4 p-2 h-8'/>
            </div>
            <button className='w-36 h-12 text-lg bg-[#1D3557] text-white absolute bottom-10'>Create Team</button>
          </div>
        </form>
      </div>
    </div>
  )
}
