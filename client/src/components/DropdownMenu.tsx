import { useEffect, useState } from 'react'
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

export const DropdownMenu = (props:any) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleClick = (e:any) => {
    props.setDropdownValue(e.target.getAttribute('value'))
    setIsExpanded(false)
  }



  return (
    <>
      <h1 className='text-lg mb-2'>{props.title}</h1>
      <div className='border border-gray-500 rounded-sm'>

        <button type='button' onClick={() => {setIsExpanded(prev => !prev)}} className='bg-white w-32 h-10 py-1 flex justify-center items-center'>
          <div className='mr-1'>{props.dropdownValue}</div>
          <div>
            {!isExpanded && <AiOutlineRight/>}
            {isExpanded && <AiOutlineDown/>}
          </div>
        </button>
          {isExpanded &&  //display dropdown contents
            <div>
              <hr className='border-1 border-black'></hr>
              <ul>
                {props.list.map((item: string, index: number) => {
                  return (
                    <li 
                      value={item} 
                      onClick={(e:any) => {
                        handleClick(e)
                      }} 
                      className='cursor-pointer hover:bg-blue-500 hover:text-white p-1' key={index}>
                      {item}
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

export default DropdownMenu