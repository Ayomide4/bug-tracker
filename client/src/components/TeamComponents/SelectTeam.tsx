import axios from 'axios'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'
import React, { useState } from 'react'
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

export default function SelectTeam(props:any) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [btnTitle, setBtnTitle] = useState('Teams')
  const login = useLogin()
  //props needed list, list type = select team, title

  const handleClick = (e:any) => {
    const value:any = e.target.getAttribute('value')
    props.setMyTeamName(value)
    setIsExpanded(prev => !prev)
    // console.log('list', props.list)
      axios.post('http://localhost:3002/dropdown', {"value": value})
        .then((response) => {
          let tempData = [...response.data.members]
          props.setProjects(response.data.projects)
          props.setMembers({...props.members, memberArray: tempData.reverse()})

        })
        .catch((error) => {
          console.log(error.response)
        })

  }


  return (
    <>
      <div className='border border-gray-500 rounded-sm  z-10'>
        <button type='button' onClick={() => {setIsExpanded(prev => !prev)}} className='bg-white w-32 h-11 flex justify-center items-center'>
        <div className='mr-1'>{btnTitle /* change title when dropdown value changes*/}</div> 
        <div>
          {!isExpanded && <AiOutlineRight/>}
          {isExpanded && <AiOutlineDown/>}
        </div>
          </button>
          {isExpanded &&  //display dropdown contents
              <div className=''>
                <hr className='border-1 border-black'></hr>
                <ul className=''>
                  {props.list.map((item: any, index: number) => {
                    return (
                      <li value={item.team.teamName} onClick={(e:any) => {handleClick(e)}} className='cursor-pointer hover:bg-blue-500 hover:text-white p-1 bg-white' key={index}>
                        {item.team.teamName}
                      </li>
                    )
                  })}
                </ul>
              </div>
          }
      </div>
    </>
  )
}
