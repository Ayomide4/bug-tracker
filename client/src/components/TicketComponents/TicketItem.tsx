import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { notify } from '../ProjectComponents/Project'
import { ToastContainer } from 'react-toastify';
import CreateItem from '../CreateItem';
import { useDashboard } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/DashboardProvider';

export default function TicketItem(props:any) {

  
  const [data, setData] = useState<{}[]>([{}])
  const [trigger, setTrigger] = useState(false)


  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    status: 'active',
    prio: '',
    dev: 'none'
  })


  let openCount = 0
  let devCount = 0
  
  const fetchData = async () => {
    axios.get("http://localhost:3002/ticket/list")
    .then(res => {
      const list: {}[] = res.data
      setData(list.reverse())
      props.setListLength((prev:number) => list.length) //getting the length of the array of objects to render total items
      props.setTicketStatus({development: devCount, open: openCount})
    })
    .catch(err => console.log(err))
  }


  //const activeTickets = data.filter((entry:any) => entry.status === 'New')
  useEffect(()=>{
    fetchData()
  },[props.listLength])


  const displayItems = data.map((entry:any, index:number) => {
    if(entry.status === 'Open'){openCount=openCount+1}
    if(entry.status === 'Development'){devCount = devCount+1}
    
    return (
        <tr className='cursor-pointer hover:bg-gray-200' key={index}>
          <td className='pl-4 text-lg max-h-1'>{entry.title}</td>
          <td className='text-lg px-2 max-h-1 max-w-4xl'>{entry.desc !== undefined && entry.desc.length > 40 ? `${entry.desc.substring(0,40)}...`: entry.desc}</td>
          <td className='text-lg max-h-1'>{entry.status}</td>
          <td className='text-lg max-h-1'>{entry.prio}</td>
          <td className='text-lg max-h-1'>{entry.dev}</td>
        </tr>
    )
  })




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

  
  return (
    <div className={`border relative  border-[#2A6470] rounded-lg shadow-outline max-h-screen w-full bg-white`}>
      <CreateItem trigger={trigger} closeModal={handleClick} notify={notify} listLength={props.listLength} setListLength={props.setListLength} itemType={'ticket'} formData={formData} setFormData={setFormData}/>
      <div className='flex justify-between p-4'>
        <h2 className='text-xl text-[#1D3557]'>Tickets</h2>
        <form>
          <label>Filter</label>
          <input className='border border-black' maxLength={20} type="text"/>
        </form>
        <button onClick={handleClick} className='border rounded-md bg-[#1D3557] p-2 text-white text-base'>New Ticket</button>
      </div>
      <div className='overflow-y-scroll max-h-96 h-96'>
        <table className='w-full'>
            <thead className='text-[#707785] text-left'>
              <tr>
                <th className='py-3 bg-[#F3F4F6] sticky max-h-6 pl-4 top-0 w-52'>Title</th>
                <th className='py-3 bg-[#F3F4F6] sticky max-h-6 top-0 px-2'>Description</th>
                <th className='py-3 bg-[#F3F4F6] sticky max-h-6 top-0 w-32'>Status</th>
                <th className='py-3 bg-[#F3F4F6] sticky max-h-6 top-0 w-32'>Priority</th>
                <th className='py-3 bg-[#F3F4F6] sticky max-h-6 top-0 w-52'>Ticket Author</th>
              </tr>
            </thead>
            <tbody className='text-left'>
              {displayItems !== undefined ? displayItems: null}
            </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  )
}
