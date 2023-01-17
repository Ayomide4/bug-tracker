import React, {useState} from 'react'
import CreateTeam from './CreateTeam'
import Team from './Team'
import SelectTeam from './SelectTeam'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'


export default function Teams() {
  const [trigger, setTrigger] = useState<boolean>(false)
  const handleClick = () => {
    setTrigger((prev) => !prev)
  }
  const login = useLogin()



  return (
    <div className='w-full h-full relative'>
      {trigger && <Team/>}
      

      {/* <div className=' border border-black rounded w-4/5 h-40 bg-white'> </div> */}

      { !trigger && <CreateTeam setTrigger={setTrigger}/>}
    
    </div>
  )
}
