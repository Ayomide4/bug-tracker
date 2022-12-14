import React from 'react'
import Home from './pages/DashboardPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Dashboard } from './components/DashboardComponents/Dashboard'
import TicketPage from './pages/TicketPage'
import AdminPage from './pages/AdminPage'
import ErrorPage from './pages/ErrorPage'
import ProjectPage from './pages/ProjectPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/projects' element={<ProjectPage/>}/>
        <Route path='/tickets' element={<TicketPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </Router>

  
  )
}

export default App
