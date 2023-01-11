import { useState } from 'react'
import image from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/assets/login.jpg'  
import Login from '../components/LoginComponents/Login'
import SignUp from '../components/LoginComponents/SignUp'
import {toast, ToastContainer} from 'react-toastify'

const notify = (success:boolean) => {
  if (!success) {
    toast.error('Input cannot be empty', {
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

export default function LoginPage() {
const [trigger, setTrigger] = useState<boolean>(true)


  return (
      <div className='w-screen h-screen relative'>
          <div className='flex w-full h-full bg-white'>
            {trigger ? <Login setTrigger={setTrigger} notify={notify}/> : <SignUp setTrigger={setTrigger} notify={notify}/>}
            <img className='w-3/5 rounded-l-2xl' src={image}/>
          </div>
      
      </div>
  
  )
}