import {useState, useEffect} from 'react'
import axios from 'axios'
import CreateProject from '../ProjectComponents/CreateProject'
import { notify} from '../ProjectComponents/Projects'
import { ToastContainer, toast } from 'react-toastify';


export default function TicketItem(props:any) {

  const [data, setData] = useState([{}])
  const [trigger, setTrigger] = useState(false)


  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    status: 'New',
    prio: '',
    dev: 'none'
  })
  
  const fetchData = async () => {
    axios.get("http://localhost:3002/ticket/list")
    .then(res => {
      const list = res.data
      setData(list)
      props.setListLength(list.length)

    })
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    fetchData()
  },[props.listLength])


  const handleClick = () => {
    setTrigger(trigger => !trigger) 
    const blankData = {
      ...formData,
      title: '',
      desc: '',
      prio: '',
    }

    setFormData(blankData) 
    }

  const displayItems = 
    data.map((entry:any, index:number) => {
      return (
        <tr className='cursor-pointer hover:bg-gray-200 ' key={index}>
          <td className='pl-4 text-lg'>{entry.title}</td>
          <td className='text-lg'>{entry.desc}</td>
          <td className='text-lg'>{entry.status}</td>
          <td className='text-lg'>{entry.prio}</td>
          <td className='text-lg'>{entry.dev}</td>
        </tr>
      )
    })

    
  
  return (
    <div className={`border relative  border-[#2A6470] rounded-lg shadow-outline max-h-screen w-full bg-white`}>
      {/* <CreateProject trigger={trigger} closeModal={handleClick} info={ticketInfo}/> */}
      <CreateProject trigger={trigger} closeModal={handleClick} notify={notify} listLength={props.listLength} setListLength={props.setListLength} itemType={'ticket'} formData={formData} setFormData={setFormData}/>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl text-[#1D3557]'>Tickets</h2>
        <button onClick={handleClick} className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Ticket</button>
      </div>
      <div className='overflow-y-scroll max-h-96 h-96'>
        <table className='w-full'>
            <thead className='text-[#707785] text-left'>
              <tr>
                <th className='py-3 bg-[#F3F4F6] sticky pl-4 top-0'>Title</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Description</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Status</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Priority</th>
                <th className='py-3 bg-[#F3F4F6] sticky top-0'>Ticket Developer</th>
              </tr>
            </thead>
            <tbody className='text-left '>
              {displayItems}
            </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  )
}
