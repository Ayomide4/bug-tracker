import React from 'react'
import { FaArrowLeft } from "react-icons/fa"

type Props = {
  isModalOpen : boolean,
  setIsModalOpen : React.Dispatch<React.SetStateAction<boolean>>
}

export default function TicketInfoModal({isModalOpen, setIsModalOpen} : Props) {
  return (
    <>
      {isModalOpen && 
        <div className='w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex justify-center items-center z-50'>
          <div className='relative w-2/5 h-3/5 bg-white'>
            <div className='p-4 h-full border border-black'>
              <div className='flex items-center mb-2 justify-between'>
                <div className='flex justify-center items-center'>
                  <FaArrowLeft size={16}/>
                  <h1 className='text-xl font-bold ml-2'>Ticket Name</h1>
                </div>
                <h1 className='ml-40 mr-4 font-semibold'>HIGH</h1>
              </div>
              <div className='w-11/12 ml-6'>
                <h2 className='text-lg font-semibold'>Description</h2>
                <p className='w-4/5 h-52 ml-2 mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint </p>
                <h2 className='text-lg font-semibold'>Ticket Developer:</h2>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

