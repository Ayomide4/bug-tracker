import React from 'react'

export default function ProjectItem(props:any) {
  return (
    <div className='flex items-center '>
      <a><h2>{props.name}</h2></a>
      <a className='border border-red-600 ml-32'><h2>{props.desc}</h2></a>
      <a className='border border-red-600 ml-32'><h2>{props.team}</h2></a>
      <a><h2>{props.lastUpdated}</h2></a>
    </div>
  )
}
