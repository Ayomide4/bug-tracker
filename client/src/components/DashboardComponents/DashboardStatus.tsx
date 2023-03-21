import axios from 'axios'
import { useDashboard } from '/Users/ayoomotosho/web_development/projects/bug-tracker/client/src/DashboardProvider'
import { useEffect} from 'react'
import { useLogin } from '../../LoginProvider'
import { toToastItem } from 'react-toastify/dist/utils'



export default function DashboardStatus() {

  let total = 0
  

  //TODO: Filter active projects and get length to send to dashboard

  // const login = useLogin()
  // console.log(login?.loginInfo)

  const dashStatus = useDashboard()
  const fetchDashInfo = async () => {
    // axios.get('http://localhost:3002/ticket/list')
    //   .then(res => {
    //     const list = res.data
    //     total = list.length
    //     dashStatus?.setProjectDashboard({...dashStatus.projectDashboard, totalTickets: total})
    //   })
    // axios.get('http://localhost:3002/project/list')
    //   .then(res => {
    //     const list = res.data
    //     const activeList= list.filter((entry:any, index:number)=> {
    //       return entry.status === "Active"
    //     })
    //     dashStatus?.setProjectDashboard({...dashStatus.projectDashboard, activeProjects: activeList.length})
    //   })

      axios.all([
        axios.get('http://localhost:3002/ticket/list'),
        axios.get('http://localhost:3002/project/list')
      ]).then(axios.spread((data1, data2) => {
        console.log(data1.data)
        const ticketList = data1.data
        const projectList = data2.data
        const totalTickets = ticketList.length
        const assignedTicketList = ticketList.filter((entry:any, index:number) => {
          return entry.dev !== "none"
        })
        const activeProjects = projectList.filter((entry:any, index:number) => {
          return entry.status === "Active"
        } )
        console.log(dashStatus?.projectDashboard)
        dashStatus?.setProjectDashboard({...dashStatus.projectDashboard, totalTickets: totalTickets, activeProjects: activeProjects.length, assignedTickets: assignedTicketList.length, unassignedTickets: totalTickets-assignedTicketList.length})
      }))

    }
    
    useEffect(()=>{
      fetchDashInfo()
    }, [dashStatus?.projectDashboard.totalTickets])



  return (
    <div>
      <h2 className='text-3xl font-medium text-[#1D3557] mb-6 mx-6 md:mb-10 mt-6'>Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-full mx-4 ">
        <div className='bg-[#E63946] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>{dashStatus?.projectDashboard.activeProjects}</h2>
            <h2 className='text-center text-black text-xl mb-2'>Active Projects</h2>
        </div>
        <div className='bg-[#457b9d] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>{dashStatus?.projectDashboard.totalTickets}</h2>
            <h2 className='text-center text-black text-xl mb-2'>Total Tickets</h2>
        </div>
        <div className='bg-[#A8DADC] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>{dashStatus?.projectDashboard.assignedTickets}</h2>
            <h2 className='text-center text-black text-xl mb-2'>Assigned Tickets</h2>
        </div>
        <div className='bg-[#FFC211] h-44 rounded-lg shadow-md flex flex-col justify-center items-center'>
            <h2 className='text-black text-2xl text-center font-bold'>{dashStatus?.projectDashboard.unassignedTickets}</h2>
            <h2 className='text-center text-black text-xl mb-2'>Unassigned Tickets</h2>
        </div>
      </div>
    </div>
  )
}
