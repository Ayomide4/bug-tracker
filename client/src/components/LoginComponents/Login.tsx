import { FormEvent, useState } from "react"
import {toast, ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import axios from "axios"


interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
  notify:  (success: boolean) => void 
}

interface loginType{
  email: string;
  password: string;
  checked: boolean
}

export default function ({setTrigger, notify} : Props) {
  const navigate = useNavigate()
  const handleClick = () => {
    setTrigger((prev) => !prev)
  }

  const [loginInfo, setLoginInfo] = useState<loginType>({
    email: '',
    password: '',
    checked: false
  })

  const newData:any = {...loginInfo}

  const handleChange = (e:any) => {
    newData[e.target.id] = e.target.value
    setLoginInfo(newData)
    console.log(loginInfo)
  }

  const handleChecked = () => {
    let isChecked = loginInfo.checked
    setLoginInfo({...loginInfo, checked: !isChecked})
    console.log(loginInfo)
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()

    if(loginInfo.email === "" || loginInfo.password === ""){
      axios.post('http://localhost:3002/login', loginInfo)
      notify(false)
    } else{
      console.log(loginInfo)
      navigate('/dashboard')
    }
  }

  return (
      <div className='bg-white w-2/5 h-full flex justify-center '>
        <ToastContainer/>
          <div className='flex flex-col w-96'> 
            <h1 className='text-3xl font-bold mt-10'>Bug Tracker</h1>
            <form onSubmit={e => handleSubmit(e)}>
              <h1 className='text-2xl font-bold pb-6 w-full mt-28'>Sign In</h1>
              <div className='pb-4 flex flex-col w-full'>
                <label className='font-semibold'>Email Address</label>
                <input id="email" onChange={e => handleChange(e)} className=' border-b-2 border-gray-500 w-full'/>
              </div>
              <div className='flex flex-col pb-4 w-full'>
                <label className='font-semibold'>Password</label>
                <input type='password' id="password" onChange={e => handleChange(e)} className='border-b-2 border-gray-500  w-full'/>
              </div>
              <div className='flex mb-6'>
                <label className='w-full ml-2'>Remember Me</label>
                <input id="checkbox" onChange={handleChecked} type='checkbox'/>
              </div>
            <button className='bg-[#1D3557] w-full text-white h-10 rounded mb-6'>Log In</button>
            </form>
          <p>Don't have an account? Sign up <span onClick={handleClick} className='font-bold cursor-pointer underline'>here</span></p>
          
          <h1>Demo Account</h1>
          </div>      
      </div>
  )
}
