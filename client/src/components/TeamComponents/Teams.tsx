import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CreateTeam from './CreateTeam'
import Team from './Team'

import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'


export default function Teams() {
  const login = useLogin()
  
  const getLocalState:any = localStorage.getItem('login state')
  const localState: any = JSON.parse(getLocalState)
  console.log(`this is local state ${localState}`)
  const [trigger, setTrigger] = useState<boolean>(localState.isAdmin)
  console.log('local state' , localState)
  let user:any = {}

  

  return (
    <div className='w-full h-full'>
      {trigger && <Team/>}
      

      {/* <div className=' border border-black rounded w-4/5 h-40 bg-white'> </div> */}

      { !trigger && <CreateTeam setTrigger={setTrigger}/>}
    
    </div>
  )
}
