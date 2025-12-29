import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const OwnerProtected = ({compo}) => {
    const {owner} = useSelector(state => state.auth)
  return owner ? compo : <Navigate to="/listProperty"/>
}

export default OwnerProtected