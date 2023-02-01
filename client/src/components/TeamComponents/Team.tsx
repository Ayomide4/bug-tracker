import React, { useEffect, useState } from 'react'
import DropdownMenu from '../DropdownMenu'
import { useLogin } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/LoginProvider'
import ClipLoader from "react-spinners/ClipLoader";
import SelectTeam from './SelectTeam';
import axios from 'axios';
import AddMember from './AddMember';
import { ToastContainer } from 'react-toastify';


interface memberType {
  memberArray : any[]
  memberArrayLength: number
}

export default function Team(props:any) {
  const [dropdownValue, setDropdownValue] = useState({prio: '', status: 'new'})
  const [list, setList] = useState([''])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [memberName, setMemberName] = useState<string>('')
  const [members, setMembers] = useState<memberType>({
    memberArrayLength: 1,
    memberArray: []
  })
  const [teams, setTeams] = useState([])

  const login = useLogin()
  let manager = {}
  
  const renderMembers = members.memberArray.map((entry:any, index:number) => {
    return(
      entry.fullName ? 
      <tr className='cursor-pointer hover:bg-gray-200 table-row' key={index}>
        <td id='memberName' key={index}  className='pl-2 w-1/12'>{entry.fullName}</td>
      </tr>
      :
      <tr className='cursor-pointer hover:bg-gray-200 table-row' key={index}>
        <td id='memberName' key={index}  className='pl-2 w-1/12'>{entry.memberId.fullName}</td>
      </tr>
    )
  })

  const fetchData = async (obj:any) => {
    //GET TEAM DATA
    await axios.get(`http://localhost:3002/team/${obj._id}`)
      .then(response => {
        const test = JSON.stringify(response.data)
        localStorage.setItem("team state", test)
        props.setMyTeamName(response.data.teamName)
        manager = response.data.manager
        let tempData = [...response.data.members, manager]
        //setList([...response.data.members])
        //setMembers({...members, memberArrayLength: data.teams[0].members.length})
        setMembers({...members, memberArray: tempData.reverse()})
      })
  }

    
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      const temp:any = localStorage.getItem("login state")
      const obj:any = JSON.parse(temp)
      console.log(`teams ${obj.teams}`)
      setList(obj.teams)
      if(!props.member){
        fetchData(obj)
      }
      setLoading((prev) => !prev)
      props.setHasLoaded(true)
      setLoading(false)
      renderMembers

      //TODO: IF NOT ADMIN BUT A PART OF A TEAM, DISPLAY THAT TEAM
      //TODO: RENDER PROJECTS/ ADD PROJECTS TO TEAMS


      //GET USER DATA
      axios.get(`http://localhost:3002/user/${obj._id}`)
        .then((response) => {
          localStorage.setItem("login state", JSON.stringify(response.data))
          login?.setLoginInfo({...response.data})
        })
      }, 450)
  }, [props.trigger, members.memberArrayLength])





  return (
    <div>
      {loading ? 
      <div className='w-full h-screen flex items-center justify-center '>
        <ClipLoader color={'#1D3557'}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"/> 
      </div>
      :  
      <>
        <h1 className='ml-6 mt-6 font-semibold text-2xl text-[#1D3557] mb-8'>Teams</h1>


        <div className='absolute top-4 right-8 flex'>
          <button className='w-32 mr-2 px-2 h-12 text-md bg-[#1D3557] text-white'>Create Team</button>
          <SelectTeam list={list} setMyTeamName={props.setMyTeamName}/>
        </div>
        <div className='flex items-start justify-evenly mb-8 z-0'>
          {/* TEAM LIST */}
          <div className='w-5/12 h-80 bg-white border border-[#1D3557] shadow-sm rounded'>
            <div className='flex justify-between items-center py-2'>
              <h2 className=' text-xl font-semibold ml-2 text-[#1D3557]'>{props.myTeamName}</h2>
              <button className='w-32 mr-2 px-2 h-8 text-md bg-[#1D3557] text-white' onClick={()=>setIsModalOpen(prev=>!prev)}>Add Member</button>  
            </div>
            <div className="border border-black border-b-0 border-x-0 w-full">
              <table className='w-full h-full table-fixed'>
                <thead className='text-[#707785] bg-[#F3F4F6] text-left'>
                  <tr>
                    <th className='pl-2 w-full'>Members</th>
                  </tr>
                </thead>
                <tbody className='text-left block w-full overflow-scroll max-h-60 z-0 flex-none relative'>
                  {renderMembers}
                </tbody>
              </table>
            </div>
          </div>

          {/* PROJECT LIST */}
          <div className='border border-[#1D3557] shadow-sm rounded w-6/12 h-80 bg-white'>
            <div className='flex items-center justify-between w-full pt-2'>
              <h2 className='text-xl font-semibold px-2 mb-2 text-[#1D3557]'>Projects</h2>
              <div className='flex items-center pb-2'>
              <button  className='w-32 mr-2 px-2 h-8 text-md bg-[#1D3557] text-white'>Create Project</button>
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
        {/* TODO: TICKETS */}
        <div className=' h-72 mx-8 bg-white rounded shadow-lg'></div>
        <AddMember manager={manager={}} members={members} setMembers={setMembers} id={login?.loginInfo._id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} memberName={memberName} setMemberName={setMemberName}/>
        </>

} 
  <ToastContainer/>
    </div>
  ) 
}
