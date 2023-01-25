import React, { useState } from 'react'
import axios from 'axios'

type Props = {
  id: string,
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  memberName: string
  setMemberName: React.Dispatch<React.SetStateAction<string>>
}

export default function AddMember({id, isModalOpen, setIsModalOpen, memberName, setMemberName} : Props){

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsModalOpen(prev => !prev)
    console.log(memberName)
    
    axios.post(`http://localhost:3002/user/teams/members/${id}`, {"memberName": memberName})
      .then(response => {
        console.log(`member post response ${response.data}`)
      })
      .catch(error => {
        console.log(`error ${error}`)
      })
  }

  const handleChange = (e:any) => {
    setMemberName(e.target.value)
  }

  return (
    <>
    {isModalOpen && 
      <div className='h-full w-full bg-black bg-opacity-20 flex justify-center items-center absolute top-0 left-0 z-50'>
        <div className='relative p-10 w-2/5 h-32 bg-white opacity-100'>
        <button className='w-20 h-7 bg-[#1D3557] text-white absolute top-4 left-6' onClick={() => setIsModalOpen(prev => !prev)}>Cancel</button>
          <form onSubmit={e => handleSubmit(e)}>
            <div className='flex justify-start items-center mt-4'>
              <h1 className='text-lg font-medium'>Enter Full Name</h1>
              <input className='ml-8 border border-black' onChange={e => handleChange(e)}/>
              <button className='w-20 h-8 text-lg bg-[#1D3557] text-white ml-4'>Add</button>
            </div>
          </form>
        </div>
      </div>}
    </>
  )
}
