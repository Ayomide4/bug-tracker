import React, {Component, useEffect} from 'react'
import axios from 'axios'

export default function UserDetails() {

  useEffect(()=> {
    axios.post('http://localhost:3002/userData')
  })

  return (
    <div>UserDetails</div>
  )
}
