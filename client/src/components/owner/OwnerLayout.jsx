import React from 'react'
import { Outlet } from 'react-router-dom'
import OwnerNavbar from './OwnerNavbar'

const OwnerLayout = () => {
  return <>
   <OwnerNavbar/>
    <Outlet/>
  </>
}

export default OwnerLayout