import React from 'react'
import { Navbar } from '../components/Navbar'
import Ticket from '../components/TicketComponents/Tickets'
import { projectDashboardType } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/App'

interface Props {
  projectDashboard: projectDashboardType
  setProjectDashboard: React.Dispatch<React.SetStateAction<projectDashboardType>>
}

export default function TicketPage(){
  return (
    <div className='max-w-full h-screen flex p-0 m-0 bg-[#F4F6F6]'>
      <Navbar/>
      <Ticket/>
    </div>
  )
}
