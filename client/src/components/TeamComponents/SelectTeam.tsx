import React, { useState } from 'react'
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

export default function SelectTeam(props:any) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [btnTitle, setBtnTitle] = useState('Teams')

  //props needed list, list type = select team, title

  const handleClick = (e:any) => {
    const value = e.target.getAttribute('value')
    props.setMyTeamName(value)
    setIsExpanded(prev => !prev)
    console.log('list', props.list)
  }


  return (
    <>
      <div className='border border-gray-500 rounded-sm'>
        <button type='button' onClick={() => {setIsExpanded(prev => !prev)}} className='bg-white w-32 h-11 flex justify-center items-center'>
        <div className='mr-1'>{btnTitle /* change title when dropdown value changes*/}</div> 
        <div>
          {!isExpanded && <AiOutlineRight/>}
          {isExpanded && <AiOutlineDown/>}
        </div>
          </button>
          {isExpanded &&  //display dropdown contents
              <div>
                <hr className='border-1 border-black'></hr>
                <ul className='z-10'>
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
