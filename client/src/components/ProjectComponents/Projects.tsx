import { useState } from 'react'
import ProjectItem from './ProjectItem'
import CreateProject from './CreateProject'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from '../List';

export default function Projects() {
  


  const [trigger, setTrigger] = useState(false)

  const handleClick = () => {
    setTrigger(trigger => !trigger) 
    }

  const notify = () => {
    toast.success('Created new project 🚀', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <div className='border mb-20 relative border-[#2A6470] rounded-lg w-11/12 mx-12 shadow-outline h-3/4  bg-white '>
      <CreateProject trigger={trigger} closeModal={handleClick} notify={notify}/>
      <div className=''>
        <div className='flex justify-between p-4 '>
          <h2 className='text-xl text-[#1D3557]'>Projects</h2>
          <button onClick={handleClick} className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Project</button>
        </div>fsdfs
          <ProjectItem/>

      </div>
      <ToastContainer/>
    </div>
  )
}
