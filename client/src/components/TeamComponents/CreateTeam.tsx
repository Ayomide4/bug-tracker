import React, { FormEvent, useState } from 'react'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'
import axios from 'axios'


interface Props {
  trigger: boolean
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

type teamType = {
  title: string,
  manager: any
}

export default function CreateTeam({trigger, setTrigger} : Props) {
  const login = useLogin()
  console.log('login info global ',login?.loginInfo)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [team, setTeam] = useState<teamType>({
    title: '',
    manager: login?.loginInfo.id
  })


  //get login state from localStorage
  const temp:any = localStorage.getItem('login state')
  const obj:any = JSON.parse(temp)

  const handleChange = (e: any) => {
    setTeam({...team, title: e.target.value})
    
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTrigger((prev) => !prev)


    if(login?.loginInfo.isAdmin){
      console.log('already admin')
      return
    } else {
      axios.patch(`http://localhost:3002/user/${obj._id}`)
        .then((response) => {
          console.log('patch user/id', JSON.stringify(response.data))
        })
        .catch((error) => {
          console.log(error.data)
          console.log(error.status)
          console.log(error.headers)
        })
    }
    
    axios.patch(`http://localhost:3002/user/teams/${obj._id}`, team)
      .then((response) => {
        console.log(`added team to user ${login?.loginInfo.id}: ${response.data}`)

      })
      .catch((error) => {
        console.log(error.data)
      })
    
    
  }

  const handleClick = () => {
    setIsModalOpen((prev) => !prev)
  }

  return (
    <>
      <>
        <h1 className='ml-6 mt-6 font-semibold text-2xl text-[#1D3557] mb-8'>Teams</h1>
        <h1 className='text-xl h-32 text-center'>You are not in any teams</h1>
        <button className='absolute top-10 right-10 bg-[#1D3557] rounded-lg w-36 h-12 text-white ' onClick={handleClick}>Create Team</button>
      </>

      {isModalOpen && 
        <div className='h-full w-full bg-black bg-opacity-20 flex justify-center items-center absolute top-0 left-0 z-50'>
          <div className='relative p-10 w-2/5 h-32 bg-white opacity-100'>
            <form onSubmit={e=> handleSubmit(e)} className=''>
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center'>
                  <label className='text-xl mb-1 font-semibold' >Team Name</label>
                  <input id='team' onChange={e => handleChange(e)} value={team.title} className='border border-black w-52 ml-4 p-2 h-8'/>
                </div>
                <button className='w-36 h-12 text-lg bg-[#1D3557] text-white '>Create Team</button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}
