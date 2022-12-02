import React from 'react'
import {Navbar} from './components/Navbar'
import {Dashboard} from './components/Dashboard'



function App() {

  return (
    <div className='max-w-full h-screen border-4 border-red-800 flex p-0 m-0'>
      <Navbar/>
      <Dashboard/>
    </div>
  )
}

export default App
