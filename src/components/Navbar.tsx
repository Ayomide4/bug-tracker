import {AiOutlineBug, AiOutlineHome} from 'react-icons/ai'
import {BiTask} from 'react-icons/bi'
import {RiAdminLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import { useState } from 'react'





export const Navbar = () => {

const [toggle, setToggle] = useState<boolean>(false)
const Menu: Array<string> = ["Dashboard", "Tickets", "Admin"]
const Icons = [
  <AiOutlineHome size='24' color='#9AD2D9'/>,
  <BiTask size='24' color='#9AD2D9'/>,
  <RiAdminLine size='24' color='#9AD2D9'/>
]

function renderSwitch(index:number):string{
  switch(index){
    case 0:
      return '/'
      break
    case 1:
      return '/tickets'
      break
    case 2:
      return '/admin'
      break
    default:
      return '/'
  }
}

  return (
    <section className='flex flex-col w-1/6 bg-[#2A6470] max-h-screen'>
      <div className='mt-4 flex flex-col gap-5 relative pt-4 w-full'>

        <Link to='/'>
          <span className='flex items-center gap-2 cursor-pointer mb-10  px-1'>
              <AiOutlineBug  size='24' color='#64C2CA'/>
              <h2 className='text-2xl font-bold text-white'>Bug Tracker</h2>
          </span>
        </Link>
        <ul>
          {Menu.map((item, index)=>{
            return (
              <Link to={renderSwitch(index)}>
                <li key={index} className={`flex items-center gap-2 cursor-pointer mx-2 px-1 mt-4 `}>
                  {Icons[index]}
                  <h2 className='text-xl text-white'>{item}</h2>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
