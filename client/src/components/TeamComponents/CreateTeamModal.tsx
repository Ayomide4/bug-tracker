import React, { useState, useCallback, FormEvent } from 'react'
import axios from 'axios'

type teamType = {
  title: string,
  manager: any
}

export default function CreateTeamModal(props: any) {
  const temp:any = localStorage.getItem('login state')
  const obj:any = JSON.parse(temp)
  const name = `${obj.firstName} ${obj.lastName}`


  const [team, setTeam] = useState<teamType>({
    title: '',
    manager: name
  })

  const handleChange = (e: any) => {
    setTeam({...team, title: e.target.value})
  }

  const handleSubmit = useCallback( (e: FormEvent) => {
    e.preventDefault()
    
    //gets user obj
    axios.patch(`http://localhost:3002/user/teams/${obj._id}`, {title: team.title})
    .then((response) => {
      let obj = {...response.data}
      console.log('obj response', obj)
      console.log('team ', team)
      localStorage.setItem("login state",JSON.stringify(obj))
      props.setTrigger((prev:boolean) => !prev)
    })
    .catch((error) => {
      console.log(error.data)
    }) 
  },[team])

  
  return (
    <div className='h-full w-full bg-black bg-opacity-20 flex justify-center items-center absolute top-0 left-0 z-50'>
          <div className='relative p-10 w-2/5 h-40 bg-white opacity-100'>
            <button className='w-20 h-6 bg-[#1D3557] text-white absolute top-4 left-6' onClick={() => props.setIsModalOpen(false)}>Cancel</button>
            <form onSubmit={e=> handleSubmit(e)} className=''>
              <div className='flex justify-between items-center mt-6'>
                <div className='flex items-center'>
                  <label className='text-xl mb-1 font-medium' >Team Name</label>
                  <input id='team' onChange={e => handleChange(e)} value={team.title} className='border border-black w-52 ml-4 p-2 h-8'/>
                </div>
                <button className='w-36 h-12 text-lg bg-[#1D3557] text-white '>Create Team</button>
              </div>
            </form>
          </div>
        </div>
  )
}
