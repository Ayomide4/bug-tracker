import axios from 'axios';
import React, { SetStateAction, useEffect, useState } from 'react'
import {FaArrowLeft} from 'react-icons/fa'
import ConfirmDelete from './ConfirmDelete';
import { toast, ToastContainer } from 'react-toastify';
//maybe should make this a shared component with ticket

const notifyDelete = (success:boolean) => {
  if(success){
    toast.success('Successfully Deleted', {
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
    toast.error('Error deleting Project', {
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

interface Props{ 
  selected: boolean;
  setIsSelected: React.Dispatch<SetStateAction<boolean>>
  selectedInfo: {
    title: string;
    desc: string;
    manager: string;
    team: string;
    status: string;
    date: string;
    id: string;
  };
  setSelectedInfo: React.Dispatch<SetStateAction<{
    title: string;
    desc: string;
    manager: string;
    team: string;
    status: string;
    date: string;
    id: string;
  }>>
}

export default function SelectedProject({selected, setIsSelected, selectedInfo, setSelectedInfo} : Props) {

  //TODO: make it so only admin can delete/edit
  //  DELETE and EDIT button shouldn't show up for regular users
  //TODO: highlight ticket colors based on prio

  const [trigger, setTrigger] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  const handleClick = () => {
    //sends a delete request to the server 
    setTrigger((prev) => !prev)  //sets triiger to open so we can see the confirm delete page

    //if page is open delete project
    if(trigger){
      axios.delete(`http://localhost:3002/project/${selectedInfo.id}`)
        .then(() => {
          setIsSelected((prevSelected) => !prevSelected)
        })
        .catch(error => {
          notifyDelete(false)
          console.error('There was an error!', error)
        })

    }
    
  }

  useEffect(() => {
    //deletes project when confirm delete state changes
      handleClick()
  }, [confirmDelete])

  return (
    <div className='w-full h-full'>
      <ToastContainer/>
      {trigger && <ConfirmDelete trigger={trigger} setTrigger={setTrigger} setConfirmDelete={setConfirmDelete} title={selectedInfo.title}/>}
      <div className='flex items-center w-full mt-6 justify-between'>
        <div className='flex items-center cursor-pointer ml-4 w-44' onClick={() => {setIsSelected(prev => !prev)}}>
          <FaArrowLeft color='#1D3557' size={20} />
          <h1 className='text-xl font-bold text-[#1D3557] ml-1'>Project Details</h1>  
        </div>
        <div className='mr-4'>
          <button className='w-24 h-15 border rounded-md bg-[#1D3557] p-2 text-white text-base'>Edit</button>
          <button onClick={handleClick} className='w-24 h-15 border rounded-md bg-[#e63946] p-2 text-white text-base'>Delete</button>
        </div>
      </div>

      <div className='flex justify-between h-3/4'>
        <div className='flex flex-col mx-6 h-full w-1/3 mt-6'>
          <div className='mb-4 border border-[#2A6470] rounded bg-white w-full h-40'>
            <h1 className=' mx-2 text-lg text-[#1D3557] font-semibold'>{selectedInfo.title}</h1>
            <p className='mx-4 mb-4'>{selectedInfo.desc}</p>
          </div>  
          <div className='w-full h-40 mb-4 mt-6 bg-white border border-[#2A6470] rounded '>
            <div className='flex justify-between items-center mx-4 my-4'>
              <h1 className='text-lg'>Created: </h1>
              <h1 className='text-lg'>{selectedInfo.date}</h1>
            </div>
            <div className='flex justify-between items-center mx-4 my-4'>
              <h1 className='text-lg'>Deadline: </h1>
              <h1 className="text-lg">Jan 31, 2023</h1>
            </div>
            <div className='flex justify-between items-center mx-4'>
              <h1 className='text-lg'>Status</h1>
              <h1 className='text-lg'>{selectedInfo.status}</h1>
            </div>
          </div>
          <div className='border border-[#2A6470] bg-white w-full h-52 mt-4 rounded'>
            <h1 className=' mx-2 text-lg text-[#1D3557] font-semibold mb-2'>Team - {selectedInfo.team}</h1>
            {/*Team list component maybe */}
            <table className='border border-black w-full border-x-0'>
              <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                <tr>
                  <th className='pl-2'>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className='text-left'>
                <tr >
                  <td className='pl-2'>Ayo Omotosho</td>
                  <td>aomotosho4@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='w-2/3 h-full bg-white rounded mt-6 mr-6 border border-[#2A6470]'>
          <div className='mt-2'>
            <h1 className='mx-2 text-lg text-[#1D3557] font-semibold mb-2'>Tickets</h1>
            <table className='border border-x-0 border-black w-full'>
                <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                  <tr>
                    <th className='pl-2'>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Developer</th>
                  </tr>
                </thead>
                <tbody className='text-left'>
                  <tr>
                    <td className='pl-2'>Ticket Title</td>
                    <td>A bug I cant figure out</td>
                    <td>High</td>
                    <td>Ayo Omotosho</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  )
}
