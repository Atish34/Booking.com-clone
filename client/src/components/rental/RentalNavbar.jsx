import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutRentalMutation } from '../../redux/api/authApi'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const RentalNavbar = () => {
     const {rental} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [Logout,{isSuccess}] = useLogoutRentalMutation()

  useEffect(()=>{
    if(isSuccess){
      toast.success("logout success")
      navigate("/rental-login")
    }
  },[isSuccess])
  return <>
        <nav className="navbar navbar-expand-lg bg-warning">
          <div className="container">
  
            <a className="navbar-brand text-light" href="#">
              Rental Panel
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
               <Link to="/rental" className="nav-link text-light" href="#">Home</Link>
               <Link to="/rental/allrental" className="nav-link text-light" href="#">ALL-Rentals</Link>
               <Link to="/rental/rentalbook" className="nav-link text-light" href="#">Bookings</Link>
              </div>
  
            
              <div className="ms-auto">
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                  >
                    {rental.name}
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
}

export default RentalNavbar