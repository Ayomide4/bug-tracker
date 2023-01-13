import React from 'react'
import { Navbar } from '../components/Navbar'
import Admin from '../components/AdminComponents/Admin'

export default function AdminPage() {
  return (
    <div className='max-w-full h-screen flex p-0 m-0 bg-[#F4F6F6]'>
      <Navbar/>
      <div className='flex flex-col justify-between w-5/6 max-h-screen bg-[#F2F5FA] '>
        <Admin/>
      </div>
    </div>
  )
}
