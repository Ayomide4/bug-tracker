import React from 'react'

interface Props{
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  title: string
}

export default function ConfirmDelete({trigger, setTrigger, setConfirmDelete, title} : Props) {

  const handleClick = () => {
    setConfirmDelete((prev) => !prev)
  }

  return (
    <div className='w-full h-full bg-opacity-20 top-0 left-0 fixed bg-black z-50 flex justify-center items-center'>
      <div className='bg-white relative w-1/3 h-1/3 bg-opacity-100 flex flex-col'>
        <div className='mx-4 mt-6 mb-12'>
          <h1 className='text-2xl font-semibold text-[#1D3557] text-center pb-4'>Delete Project?</h1>
          <p className='text-[#1D3557] text-center text-lg'>{`Are you sure you want to delete "${title}"?`}</p>
          <p className='text-[#1D3557] text-center text-lg'>You cannot undo this action.</p>
        </div>
        <div className='mx-10 flex justify-evenly px-10'>
          <button onClick={() => setTrigger((prev) => !prev)} className='bg-[#1D3557] text-white rounded-lg w-32 h-12'>Cancel</button>
          <button onClick={handleClick} className='bg-[#e63946] text-white rounded-lg w-32 h-12'>Delete</button>
        </div>
      </div>
    </div>
  )
}
