import {AiOutlineBug, AiOutlineHome} from 'react-icons/ai'
import {BiTask} from 'react-icons/bi'
import {RiAdminLine} from 'react-icons/ri'



export const Navbar = () => {
  return (
    <section className='w-1/5 bg-[#2A6470] max-h-screen'>
      <div className='mt-4 flex flex-col gap-5 relative px-4 pt-4'>
        <span className='flex items-center gap-2 cursor-pointer mb-10 '>
          <AiOutlineBug  size='24' color='#64C2CA'/>
          <h2 className='text-xl font-bold text-white'>Bug Tracker</h2>  
        </span>
        <span className='flex items-center gap-2 cursor-pointer'>
          <AiOutlineHome size='24' color='#9AD2D9'/>
          <h2 className='text-xl text-white'>Dashboard</h2>  
        </span>
        <span className='flex items-center gap-2 cursor-pointer'>
          <BiTask size='24' color='#9AD2D9'/>
          <h2 className='text-xl text-white'>Tickets</h2>
        </span>
        <span className='flex items-center gap-2 cursor-pointer'>
          <RiAdminLine size='24' color='#9AD2D9'/>
          <h2 className='text-xl text-white'>Admin</h2>
        </span>
      </div>
    </section>
  )
}
