import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

const notifyTeam = (payload: number) => {
  if (payload === 200){
    toast.success('Member Added', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }
  else if (payload ===  409) {
    toast.error('User is already a part of your team!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  else if (payload === 404){
    toast.error('User does not exist!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
}

interface memberType {
  memberArray: any[]
  memberArrayLength: number
}

type Props = {
  manager: any
  members: memberType
  setMembers:  React.Dispatch<React.SetStateAction<memberType>>
  id: string,
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  memberName: string
  setMemberName: React.Dispatch<React.SetStateAction<string>>
}

export default function AddMember({manager, members, setMembers, id, isModalOpen, setIsModalOpen, memberName, setMemberName} : Props){

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    let prevLength = members.memberArrayLength
    e.preventDefault()
    setIsModalOpen(prev => !prev)

    if(memberName === members.memberArray[0].fullName)
    {
      notifyTeam(409)
      return
    }
    axios.patch(`http://localhost:3002/team/members/${id}`, {"memberName": memberName})
      .then(response => {
        notifyTeam(response.status)
        setMembers({...members, memberArrayLength: prevLength+1})
      })
      .catch(error => {
        if(error.response.status === 409){
          notifyTeam(error.response.status)
        } 
        else if(error.response.status === 404){
          notifyTeam(error.response.status)
        }
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
