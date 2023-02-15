import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"

type Props = {
  ticketData: { 
    title: string;
    desc: string;
    dev: string;
    prio: string;},
  isModalOpen : boolean,
  setIsModalOpen : React.Dispatch<React.SetStateAction<boolean>>
}

//FIXME: LOW PRIO COLOR NOT WORKING #457B9D
const prioColors = ['green','#FFC211','#E63946']

export default function TicketInfoModal({ticketData, isModalOpen, setIsModalOpen} : Props) {
  let index:number = 0;
  
  const closeModal = () => {
    setIsModalOpen((prev:boolean) => !prev)
  }


  if(ticketData.prio == 'Low'){
    index = 0
  }
  else if(ticketData.prio === 'Medium'){
    index = 1
  }
  else if(ticketData.prio === 'High'){
    index = 2
  }


  return (
    <>
      {isModalOpen && 
        <div className='w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex justify-center items-center z-50'>
          <div className='relative w-2/5 h-3/5 bg-white'>
            <div className='p-4 h-full border border-black'>
              <div className='flex items-center mb-2 justify-between '>
                <div className='flex justify-center items-center cursor-pointer mb-2' onClick={closeModal}>
                  <FaArrowLeft color='#1D3557' size={18}/>
                  <h1 className='text-xl font-bold ml-1 text-[#1D3557]'>{ticketData.title}</h1>
                </div>
                <div className={`ml-40 mr-4 bg-[${prioColors[index]}]  text-white w-fit py-1 px-2`}>
                  <h1 className=' font-semibold'>{ticketData.prio}</h1>
                </div>
              </div>
              <div className='w-11/12 ml-6'>
                <h2 className='text-lg font-semibold text-[#1D3557]'>Description</h2>
                <p className='w-4/5 h-32 max-h-52 ml-2 mb-4'>{ticketData.desc}</p>
                <h2 className='text-lg font-semibold text-[#1D3557]'>Ticket Developer: {ticketData.dev}</h2>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

