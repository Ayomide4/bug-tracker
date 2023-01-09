import { useState } from 'react'
import image from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/assets/login.jpg'  
import Login from '../components/LoginComponents/Login'
import SignUp from '../components/LoginComponents/SignUp'


export default function LoginPage() {
const [trigger, setTrigger] = useState<boolean>(true)

  return (
      <div className='w-screen h-screen relative'>
          <div className='flex w-full h-full bg-white'>
            {trigger ? <Login setTrigger={setTrigger}/> : <SignUp setTrigger={setTrigger}/>}
            <img className='w-3/5 rounded-l-2xl' src={image}/>
          </div>
      
      </div>
  
  )
}