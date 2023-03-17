import { useState } from 'react'
import image from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/assets/login.jpg'  
import Login from '../components/LoginComponents/Login'
import SignUp from '../components/LoginComponents/SignUp'
import {toast, ToastContainer} from 'react-toastify'

const notify = (type:string) => {
  if (type === 'input') {
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
  if(type === 'password'){
    toast.error('Incorrect password', {
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
  if(type === 'user not found'){
    toast.error('User not found', {
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
  if(type === 'email taken'){
    toast.error('email is already taken', {
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
          <div className='md:flex md:w-full md:h-full bg-white'>
            {trigger ? <Login setTrigger={setTrigger} notify={notify}/> : <SignUp setTrigger={setTrigger} notify={notify}/>}
              <img className=' hidden md:block w-3/5 rounded-l-2xl' src={image}/>
          </div>
      
      </div>
  
  )
}