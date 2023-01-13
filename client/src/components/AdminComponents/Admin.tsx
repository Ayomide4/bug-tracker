import React, {useState} from 'react'
import CreateTeam from './CreateTeam'

export default function Admin() {
  const [trigger, setTrigger] = useState<boolean>(false)

  return (
    <div className='w-full h-full'>
      <h1 className='ml-6 mt-6 font-semibold text-2xl text-[#1D3557] mb-8'>Administration</h1>
      <div className='flex items-start justify-evenly mb-8'>

        {/* TEAM LIST */}

        <div className='w-5/12 h-72 bg-white border border-black rounded'>
          <div className='flex justify-between items-center py-2'>
            <h2 className=' text-xl font-semibold ml-2 text-[#1D3557]'>Team Name</h2>
            <button className='w-32 mr-2 px-2 h-8 text-lg bg-[#1D3557] text-white'>Add Member</button>  
          </div>
          <div className="border border-black border-b-0 border-x-0 w-full">
            <table className='w-full h-full'>
              <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                <tr>
                  <th className='pl-2 w-full'>Members</th>
                </tr>
              </thead>
              <tbody className='text-left'>
                <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td> </tr>
                <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
                <tr className='cursor-pointer hover:bg-gray-200'><td className='pl-2'>Ayo Omotosho</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* PROJECT LIST */}

        <div className='border border-black rounded w-6/12 h-80 bg-white'>
          <div className='flex items-center justify-between w-full pt-2'>
            <h2 className='text-xl font-semibold px-2 mb-2 text-[#1D3557]'>Projects</h2>
            <div className='flex items-center pb-2'>
              <form>
                <label id='filter' className='text-md font-semibold'>Filter</label>
                <input className='mx-4 border border-black w-32'/>
              </form>
            </div>
          </div>
          <div className='border border-black border-b-0 border-x-0 w-full'>
            <table className='w-full h-full'>
              <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                <tr>
                  <th className='pl-2 w-1/2'>Title</th>
                  <th className='pl-2 w-1/2'>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className='cursor-pointer hover:bg-gray-200'>
                  <td className='px-2'>Bug Tracker Example</td>
                  <td className='px-2'>Active</td>
                </tr>
                <tr className='cursor-pointer hover:bg-gray-200'>
                  <td className='px-2'>Social Media Example</td>
                  <td className='px-2'>Active</td>
                </tr>
                <tr className='cursor-pointer hover:bg-gray-200'>
                  <td className='px-2'>Tiktok Example</td>
                  <td className='px-2'>Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

        {/* TEAM MEMBER INFORMATION */}

        {/* <div className=' border border-black rounded w-4/5 h-40 bg-white'></div> */}

      { trigger && <CreateTeam setTrigger={setTrigger}/>}
    </div>
  )
}
