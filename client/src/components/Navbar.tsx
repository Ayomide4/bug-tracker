import {AiOutlineBug, AiOutlineHome, AiOutlineAppstore} from 'react-icons/ai'
import {BiTask} from 'react-icons/bi'
import {RiAdminLine} from 'react-icons/ri'
import {json, Link, useMatch, useResolvedPath} from 'react-router-dom'








export const Navbar = () => {

  const Menu: Array<string> = ["Dashboard","Projects", "Tickets", "Admin"]
  const Icons = [
    <AiOutlineHome size='24' color='#9AD2D9'/>,
    <AiOutlineAppstore size='24' color='#9AD2D9'/>,
    <BiTask size='24' color='#9AD2D9'/>,
    <RiAdminLine size='24' color='#9AD2D9'/>
  ]

  function CustomLink(item:string, index:number){
    const resolvedPath = useResolvedPath(renderSwitch(index))
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <Link to={renderSwitch(index)} key={index}>
          <li className={`flex items-center gap-2 mx-2 px-1 mt-4 rounded ${isActive ? 'bg-[#1D3557]': null}`}>
              <div className='flex items-center gap-2 cursor-pointer'>
                {Icons[index]}
                <h2 className='w-fit flex xl:text-xl text-white' key={item}>{item}</h2>
              </div>
          </li>
        </Link>
    )
  }

  function renderSwitch(index:number):string{
    switch(index){
      case 0:
        return '/'
        break
      case 1:
        return '/projects'
        break
      case 2:
        return '/tickets'
        break
      case 3:
        return '/admin'
        break
      default:
        return '/'
    }
  }

  return (
    <section className='flex flex-col w-1/6 bg-[#457b9d] max-h-screen'>
      <div className='mt-4 flex flex-col gap-5 relative pt-4 w-full'>
        <Link to='/'>
          <span className='flex items-center justify-center gap-2 cursor-pointer mb-10 '>
              <AiOutlineBug  size='24' color='#64C2CA'/>
              <h2 className='w-fit flex xl:text-xl font-bold text-white'>Bug Tracker</h2>
          </span>
        </Link>

        <ul>
          {Menu.map((item, index)=>{
            return (
              CustomLink(item, index)
            )
          })}
        </ul>
      </div>
    </section>
  )
}
