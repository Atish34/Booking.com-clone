import React from 'react'
import {  useLogoutOwnerMutation } from '../../redux/api/authApi'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const OwnerNavbar = () => {
  const {owner} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [Logout,{isSuccess}] = useLogoutOwnerMutation()

  useEffect(()=>{
    if(isSuccess){
      toast.success("logout success")
      navigate("/listProperty")
    }
  },[isSuccess])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">

          <a className="navbar-brand text-light" href="#">
            Owner Panel
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

           
            <div className="navbar-nav">
             <Link to="/owner" className="nav-link text-light" href="#">Home</Link>
             <Link to="/owner/allproperty" className="nav-link text-light" href="#">All-Property</Link>
             <Link to="/owner/booking" className="nav-link text-light" href="#">All-Booking</Link>
            </div>

          
            <div className="ms-auto">
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                >
                  {owner.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a onClick={Logout} className="dropdown-item" href="#">Logout</a></li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </nav>
    </>
  )
}

export default OwnerNavbar
