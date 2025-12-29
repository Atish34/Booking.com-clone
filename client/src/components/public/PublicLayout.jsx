import React from 'react'
import PublicNavbar from './publicNavbar'
import {  Outlet } from 'react-router-dom'
import Footer from './Footer'
import Home from '../../pages/public/Home'

const PublicLayout = () => {
  return <>
  <PublicNavbar/>
  <Home/>
  <Outlet/>
  <Footer/>
  </>
}

export default PublicLayout