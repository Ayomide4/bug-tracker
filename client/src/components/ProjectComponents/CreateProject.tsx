import Form from './ProjectForm.js'
import { useState } from 'react'
import axios from 'axios'




export default function CreateProject(props:any) {
    
  const [formData, setFormData] = useState({
    title: '',
    desc: '', 
    manager: 'Test Value',
    team: '',
    status: 'active',
  })

  const handleSubmit = (e:React.FormEvent) => {
    //sends project info to database
    e.preventDefault()
    
    if(formData.title  === ''|| formData.desc  === '' || formData.team  === ''){
      alert('Inputs cannot be empty')
      return false
    } else {
      axios.post("http://localhost:3002/project/create", formData)
        .catch(function (error){
          if (error.response){
            console.log(error.data)
            console.log(error.status)
            console.log(error.headers)
          }
        })
      const blankData = {
        ...formData,
        title: '',
        desc: '', 
        team: '',
      }
      setFormData(blankData)
      props.closeModal()
      props.notify()
    }
  }

  return ( props.trigger &&
    (<div className='w-full h-full fixed left-0 top-0 bg-black bg-opacity-20 flex justify-center items-center z-50'>
      <div className='relative p-20 w-3/5 h-3/4 bg-white opacity-100'>
        <button onClick={props.closeModal} className='w-20 h-10 text-lg bg-[#1D3557] absolute right-8 top-8 text-white'>Close</button>
          <Form handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
      </div>
    </div>)
  )
  }