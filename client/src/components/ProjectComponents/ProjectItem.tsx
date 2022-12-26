import axios from 'axios'
import { useState, useEffect } from 'react'



export default function ProjectItem(props:any) {

  const [data, setData] = useState([{}])
  
  //fetches list of projects and saves it into data state
  const fetchData = async () => {
    axios.get("http://localhost:3002/project/list")
      .then(res => {
        const list = res.data
        setData(list)
        props.setListLength(list.length)
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
      <tr className='cursor-pointer hover:bg-gray-200' key={index}>
        <td className='pl-4 text-lg'>{entry.title}</td>
        <td className='text-lg'>{entry.desc}</td>
        <td className='text-lg'>{entry.manager}</td>
        <td className='text-lg'>{entry.team}</td>
        <td className='text-lg'>{entry.status}</td>
      </tr>
    )
  })

  

  return (
      <div className='min-w-full overflow-scroll max-h-itemContainer flex-none relative z-0'>
        <table className='w-full'>
          <thead className='text-[#707785] text-left'>
            <tr>
              <th className='py-3 bg-[#F3F4F6] sticky pl-4 top-0'>Title</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Description</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Project Manager</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Team</th>
              <th className='py-3 bg-[#F3F4F6] sticky top-0'>Status</th>
            </tr>
          </thead>
          <tbody className='text-left'>
            {dataArray ? dataArray : null}
          </tbody>
        </table>
      </div>
    )
  }
