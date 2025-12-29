import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RentalProtected = ({compo}) => {
   const {rental} = useSelector(state => state.auth)
  return rental ? compo : <Navigate to="/rental-login"/>
}

export default RentalProtected