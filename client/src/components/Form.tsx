import CreateTeam from "./AdminComponents/CreateTeam"
import DropdownMenu from "./DropdownMenu"
import { useEffect, useState } from "react"

export default function Form(props:any) {

  const [dropdownValue, setDropdownValue] = useState({ prio: '', status: 'New'})
  const prioList: string[] = ['Low', 'Medium', 'High']
  //const ticketStatusList: string[] = ['New', 'Open', 'Development', 'Testing', 'Resolved']
  const newData:any = {...props.formData}


  const handleChange = (e:any) => {
    newData[e.target.id] = e.target.value //looks for id that matches new data and saves the value at the id
    if(props.itemType === 'project') {
      props.setFormData(newData['status'] = 'active') //default for project statsu
    }
    props.setFormData(newData) //sets formdata to new data from form
  }
  
  useEffect(()=>{
    newData['prio'] = dropdownValue['prio']
    newData['status'] = dropdownValue['status']
    props.setFormData(newData)
  }, [dropdownValue])

  

  return (
    <div className='w-full h-full fixed left-0 top-0 bg-black bg-opacity-20 flex justify-center items-center z-50'>
      <div className='relative p-20 w-3/5 h-3/4 bg-white opacity-100'>
        <button onClick={props.closeModal} className='w-20 h-10 text-lg bg-[#1D3557] absolute right-8 top-8 text-white'>Close</button>
          { props.itemType === 'project' ? 

            // PROJECT FORM
            <form onSubmit={props.handleSubmit} className='bg-white w-full h-full' autoComplete='off'>
              <div className="ml-4">
                <div className="flex flex-col mb-6">
                  <label className="mb-1 text-lg ">Title</label>
                  <input id="title" onChange={(e) => handleChange(e)} value={props.formData.title} maxLength={30} className="rounded-md w-2/3 p-2 border border-gray-500" type='text' placeholder="Enter a title"/>
                </div>
                <div className="flex flex-col mb-6">
                  <label className="mb-1 text-lg">Description</label>
                  <textarea id="desc" onChange={(e) => handleChange(e)} value={props.formData.desc} maxLength={150} className="border border-gray-500 pl-2 pt-2 h-24 resize-none w-2/3" placeholder="Enter a description"/>
                </div>
                <div className="flex flex-col mb-8">
                  <label className="mb-1 text-lg">Team</label>
                  <input id="team" onChange={(e) => handleChange(e)} value={props.formData.team} maxLength={30} className="rounded-md w-2/3 p-2 border border-gray-500" type='text' placeholder="Enter your team's name"/>
                </div>
                <button className="w-36 h-12 text-lg bg-[#1D3557] text-white">Create Project</button>
              </div>
            </form> 
            : 
          
            // TICKET FORM
            <form onSubmit={props.handleSubmit} className='bg-white w-full h-full' autoComplete='off'>
              <div className="ml-4">
                <div className="mb-6">
                  <div className="w-96">
                    <div className="flex flex-col mt-1 absolute top-16 z-10 ">
                      <label className="mb-1 text-lg">Title</label>
                      <input id="title" onChange={(e) => handleChange(e)} value={props.formData.title || ''} maxLength={20} className="rounded-md w-72 p-2 border border-gray-500" type='text' placeholder="Enter a title"/>
                    </div>
                    <div className="flex flex-col absolute top-44 z-0">
                      <label className="mb-1 text-lg">Description</label>
                      <textarea id="desc" onChange={(e) => handleChange(e)} value={props.formData.desc || ''} maxLength={140} className="border border-gray-500 pl-2 pt-2 h-40 resize-none w-72 " placeholder="Enter a description"/>
                    </div>
                  </div>
                  <div>
                    <div className=" h-12 mr-32 mb-20 absolute right-20 top-16 z-20">
                      <DropdownMenu listType='prio' dropdownValue={dropdownValue} setDropdownValue={setDropdownValue} list={prioList} title={'Priority'}/>
                    </div>

                  </div>
                </div>
                <button className="w-36 h-12 text-lg bg-[#1D3557] text-white absolute bottom-20">Create Ticket</button>
              </div>
            </form>
          }
      </div>
    </div>
  )
}
