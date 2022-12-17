import {useState} from 'react'

export default function CreateProject(props: any) {
  
  
  return ( props.trigger &&
    (<div className='w-full h-full fixed left-0 top-0  bg-black bg-opacity-20  flex justify-center items-center z-50'>
      <div className='relative p-32 w-3/4 h-3/4 bg-white opacity-100'>
        <button onClick={props.closeModal} className='w-20 h-10 bg-[#1D3557] absolute right-8 top-8 text-white'>Close</button>
        <form>
          <label>Title</label>
          
        </form>
      </div>
    </div>)
  )
}
