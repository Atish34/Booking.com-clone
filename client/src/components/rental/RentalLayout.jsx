import React from 'react'
import RentalNavbar from './RentalNavbar'
import { Outlet } from 'react-router-dom'

const RentalLayout = () => {
   return <>
   <RentalNavbar/>
    <Outlet/>
  </>
}

export default RentalLayout