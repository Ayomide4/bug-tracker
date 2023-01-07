import axios from 'axios'
import { useState, useEffect } from 'react'
import { AiFillPropertySafety } from 'react-icons/ai'



export default function ProjectItem(props:any) {

  const [data, setData] = useState([{}])
  

  const clickItem =  (e:any, entry: any) => {
    props.setIsSelected((prev:boolean) => !prev)
    props.setSelectedInfo({...props.selectedInfo, title: entry.title, desc: entry.desc, manager: entry.manager, team: entry.team, status: entry.status, date: entry.date, id: entry._id})
  }

  //fetches list of projects and saves it into data state
  const fetchData = async () => {
    axios.get("http://localhost:3002/project/list")
      .then(res => {
        const list = res.data
        setData(list.reverse())
        props.setListLength((prev:number) => list.length)
      })
      .catch(err => console.log(err))
  }

  //updates list when length changes
  useEffect(() => {
    fetchData()
  },[props.listLength])


  //ren
  const dataArray = data.map((entry:any, index:number) => {
    return(
      <tr className='cursor-pointer hover:bg-gray-200'onClick={(e) => clickItem(e, entry)} key={index}>
        <td id='title' className='pl-4 text-lg'>{entry.title}</td>
        <td id='desc' className='text-lg px-2 max-h-6 max-w-4xl'>{entry.desc !== undefined && entry.desc.length > 45 ? `${entry.desc.substring(0,50)}...`: entry.desc}</td>
        <td id='manager' className='text-lg'>{entry.manager}</td>
        <td id='team' className='text-lg'>{entry.team}</td>
        <td id='status' className='text-lg'>{entry.status}</td>
      </tr>
    )
  })


  

  return (
      <div className='min-w-full overflow-scroll max-h-itemContainer flex-none relative z-0'>
        <table className='w-full'>
          <thead className='text-[#707785] text-left'>
            <tr>
              <th className='py-3 bg-[#F3F4F6] sticky max-h-4 top-0 w-52 pl-4'>Title</th>
              <th className='py-3 bg-[#F3F4F6] sticky max-h-4 top-0 px-2'>Description</th>
              <th className='py-3 bg-[#F3F4F6] sticky max-h-4 top-0 w-32 '>Manager</th>
              <th className='py-3 bg-[#F3F4F6] sticky max-h-4 top-0 w-32'>Team</th>
              <th className='py-3 bg-[#F3F4F6] sticky max-h-4 top-0 w-32'>Status</th>
            </tr>
          </thead>
          <tbody className='text-left'>
            {dataArray !== undefined ? dataArray : null}
          </tbody>
        </table>
      </div>
    )
  }
