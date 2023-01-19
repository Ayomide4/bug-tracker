import { FormEvent, useState } from "react"
import { ToastContainer } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import {useSignIn} from 'react-auth-kit'
import { useLogin } from "../../LoginProvider"

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
  notify:  (type: string) => void 
}

interface loginType{
  email: string;
  password: string;
  checked: boolean;
  token: string;
}

export default function ({setTrigger, notify} : Props) {

  const login = useLogin()
  const signIn = useSignIn()
  const navigate = useNavigate()
  const handleClick = () => {
    setTrigger((prev) => !prev)
  }
  

  



  const newData:any = {...login?.loginInfo}

  const handleChange = (e:any) => {
    newData[e.target.id] = e.target.value
    login?.setLoginInfo(newData)

  }

  const handleChecked = () => {
    let isChecked = login?.loginInfo.checked
    login?.setLoginInfo({...newData, checked: !isChecked})
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    let responseToken = ''
    let loginData:any = login?.loginInfo


    if(login?.loginInfo.email === "" || login?.loginInfo.password === ""){
      notify('input')
    //   navigate('/dashboard')
    } else {
      axios.post('http://localhost:3002/login', login?.loginInfo)
        .then(async function (response){
          responseToken = response.data.data
          console.log('response data ',response.data)
          signIn({
            token: responseToken,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: {
              email: login?.loginInfo.email, 
            }
          })

          navigate('/')
          login?.setLoginInfo({...loginData, password: '', token: responseToken, id: response.data.id})

        })
        .catch(function (error){
          if(error.response.data.error === 'Incorrect password'){
            notify('password')
          }
          if(error.response.data.error === 'user not found'){
            notify('user not found')
          }
          console.log(error.response.data)
        }) 
        //console.log('login state: ',login?.loginInfo);
        
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
