import {useState} from 'react'
import ProgressBar from 'react-animated-progress-bar'
import TicketItem from './TicketItem'





export default function Ticket(props:any) {

  const [listLength, setListLength] = useState<number>(0)
  const [ticketStatus, setTicketStatus] = useState({
    total: 0,
    open: 0,
    development: 0
  })
  let percentage:string = "50"
  const ticketCategories:string[] = ['Title', 'Submitted By', 'Status', 'Priority', 'Last Updated']

  return (
    <>
      <div className='w-full h-full flex flex-col items-center'>
        <h1 className='w-full mt-6 pl-6 text-2xl text-[#1D3557] font-semibold'>Tickets</h1>
        <div className="grid grid-cols-3 gap-6 w-11/12 mt-6">
          <div className='bg-white h-48 rounded-lg shadow-md flex flex-col justify-center items-center border border-[#1D3557]'>
              <h2 className='text-black text-2xl text-center font-bold'>{listLength}</h2>
              <h2 className='text-center text-gray-500 text-md'>Total Tickets</h2>
          </div>
          <div className='bg-white h-48 rounded-lg shadow-md flex flex-col justify-center items-center border border-[#1D3557]'>
          <div className='h-24 w-24 mt-4 mb-2 '>
            <ProgressBar
              width="200px"
              height="10px"
              fontColor="black"
              trackWidth="18"
              percentage= {percentage}
              trackPathColor="#F3F4F6"
              trackBorderColor="white"
              defColor={{
                fair: 'green',
                good: 'green',
                excellent: 'green',
                poor: 'green',
              }}
            />
            </div>
              <h2 className='text-black text-2xl text-center font-bold'>{ticketStatus.open}</h2>
              <h2 className='text-center text-gray-500 text-md mb-4'>Status: Open</h2>
          </div>
          <div className='bg-white h-48 rounded-lg shadow-md flex flex-col justify-center items-center border border-[#1D3557]'>
          <div className='h-24 w-24 mt-4 mb-2 '>
            <ProgressBar
              width="200px"
              height="10px"
              fontColor="black"
              trackWidth="18"
              percentage= {percentage}
              trackPathColor="#F3F4F6"
              trackBorderColor="white"
              defColor={{
                fair: '#457B9D',
                good: '#457B9D',
                excellent: '#457B9D',
                poor: '#457B9D',
              }}
            />
            </div>
              <h2 className='text-black text-2xl text-center font-bold'>{ticketStatus.development}</h2>
              <h2 className='text-center text-gray-500 text-md mb-2'>Status: Development</h2>
          </div>
        </div>
        <div className='w-11/12 h-3/5 mt-4 '>
          <TicketItem title='Tickets' btn='Ticket' categories={ticketCategories} ticketStatus={ticketStatus} setTicketStatus={setTicketStatus} listLength={listLength} setListLength={setListLength} clickItem={props.clickItem}/>
        </div>
      </div>
    </>
  )
}
