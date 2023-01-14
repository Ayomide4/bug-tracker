import React from 'react'
import { Navbar } from '../components/Navbar'
import { Dashboard } from '../components/DashboardComponents/Dashboard'
import { projectDashboardType } from '../App'

interface Props {
  projectDashboard: projectDashboardType
}

export default function DashboardPage() {
  return (
    <div className='max-w-full h-screen flex p-0 m-0 bg-[#F4F6F6]'>
      <Navbar/>
      <Dashboard/>
    </div>
  )
}
