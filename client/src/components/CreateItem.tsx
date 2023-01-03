import Form from './Form.js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { notify } from './ProjectComponents/Project.js'




export default function CreateProject(props:any) {

  const formData = props.formData

  const handleSubmit = (e:React.FormEvent) => {
    //sends project info to database
    e.preventDefault()

    //reset form elements
    const blankData = {
      ...formData,
      title: '',
      desc: '', 
      team: '',
    }
    

    //form validation
    if (props.itemType === 'project'){
      if(formData.title === '' || formData.desc === '' || formData.team === ''){
        notify(false)
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

        
        props.setListLength(prev => props.setListLength(prev+1)) //
        props.setFormData(blankData) //reset form input
        props.notify(true)
        props.closeModal()
      }
    }
    else if(props.itemType === 'ticket'){
      if(formData.title === '' || formData.desc === '' || formData.prio === '- Select -')
      {
        notify(false)
        return false
      } else {
        axios.post("http://localhost:3002/ticket/create", formData)
        .catch(function (error){
          if (error.response){
            console.log(error.data)
            console.log(error.status)
            console.log(error.headers)
          }
        })


        props.setListLength(prev => props.setListLength(prev+1)) //
        props.setFormData(blankData) //reset form input
        props.notify(true)
        props.closeModal()
      }
    }
  }

  return ( props.trigger &&
    (<Form list={props.list} itemType={props.itemType} closeModal={props.closeModal} handleSubmit={handleSubmit} formData={formData} setFormData={props.setFormData}/>)
  )
  }