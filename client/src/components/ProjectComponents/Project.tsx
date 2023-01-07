import { useState } from 'react'
import ProjectItem from './ProjectItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateItem from '../CreateItem';
export const notify = (success:boolean) => {
  if (success){
    toast.success('Created new project 🚀', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }
  else if (!success) {
    toast.error('Inputs cannot be empty', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
}



export default function Project(props:any) {

  const [trigger, setTrigger] = useState(false)
  const [listLength, setListLength] = useState<number>(0)
  const [formData, setFormData] = useState({
    title: '',
    desc: '', 
    manager: 'Test Value',
    team: '',
    status: 'active',
  })

  

  const handleClick = () => {
    setTrigger(trigger => !trigger) 
    
    const blankData = {
      ...formData,
      title: '',
      desc: '',
      team: '',
    }

    setFormData(blankData)
    }



  return (
    <div className='border mb-20 relative border-[#2A6470] rounded-lg w-11/12 mx-12 shadow-outline h-full bg-white mt-6'>
      <CreateItem trigger={trigger} closeModal={handleClick} notify={notify} listLength={listLength} setListLength={setListLength} itemType={'project'} formData={formData} setFormData={setFormData}/>
      <div>
        <div className='flex justify-between p-4 '>
          <h2 className='text-xl text-[#1D3557]'>Projects</h2>
          <button onClick={handleClick} className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Project</button>
        </div>
          <ProjectItem listLength={listLength} setListLength={setListLength} setSelectedInfo={props.setSelectedInfo} selectedInfo={props.selectedInfo} selected={props.selected} isSelected={props.isSelected}/>
      </div>
      <ToastContainer/>
    </div>
  )
}
