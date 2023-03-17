import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import {ToastContainer, toast } from 'react-toastify';

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
  notify: (type: string) => void 
}

interface signUpType{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean
}


export default function SignUp({setTrigger, notify} : Props) {
  const [signUpInfo, setSignUpInfo] = useState<signUpType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false
  })

  const blankData:signUpType = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: false
  }


  const newData:any = {...signUpInfo}
  const handleChange = (e:any) => {
    newData[e.target.id] = e.target.value
    setSignUpInfo(newData)
  }

  const handleClick = () => {
    setTrigger((prev) => !prev)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    //TODO: form validation
      if(signUpInfo.firstName === "" || signUpInfo.lastName === "" || signUpInfo.email === "" || signUpInfo.password === ""){
        notify('input')
      } 
      else {
          axios.post('http://localhost:3002/register', signUpInfo)
            .then(async () => {
              setTrigger((prev) => !prev)
            })
            .catch(function (error){
              if(error.response){
                setSignUpInfo(blankData)
                notify('email taken')
              }
          })
        }    
  }


  return (
    <div className='bg-white m-4 md:w-2/5 h-full flex justify-center'>
      <ToastContainer/>
      <div className='flex flex-col  w-96'> 
      <form onSubmit={e => handleSubmit(e)}>
        <h1 className='text-2xl font-bold pb-6 w-full mt-44'>Create account</h1>
        <div className='pb-4 flex flex-col w-full'>
          <label className='font-semibold'>First Name</label>
          <input id='firstName' type='text' onChange={e => handleChange(e)} value={signUpInfo.firstName} className=' border-b-2 border-gray-500 w-full'/>
        </div>
        <div className='pb-4 flex flex-col w-full'>
          <label className='font-semibold'>Last Name</label>
          <input id='lastName' type='text' onChange={e => handleChange(e)} value={signUpInfo.lastName} className=' border-b-2 border-gray-500 w-full'/>
        </div>
        <div className='pb-4 flex flex-col w-full'>
          <label className='font-semibold'>Email Address</label>
          <input id='email' type='email' onChange={e => handleChange(e)} value={signUpInfo.email} className=' border-b-2 border-gray-500 w-full'/>
        </div>
        <div className='flex flex-col pb-10 md:pb-4 w-full'>
          <label className='font-semibold'>Password</label>
          <input id='password' onChange={e => handleChange(e)} type='password' value={signUpInfo.password} className='border-b-2 border-gray-500  w-full'/>
        </div>
        <button className='bg-[#1D3557] w-full text-white h-10 rounded mb-6'>Register</button>


      </form>
      <p>Already have an account? <span className='font-bold cursor-pointer underline' onClick={handleClick}>Sign in</span></p>
      </div>    
    </div>
  )
}
