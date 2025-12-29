import React from 'react'
import { useLogoutAdminMutation } from '../../redux/api/authApi'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const AdminNavbar = () => {
  const {admin} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [Logout,{isSuccess}] = useLogoutAdminMutation()

  useEffect(()=>{
    if(isSuccess){
      toast.success("logout success")
      navigate("/admin-login")
    }
  },[isSuccess])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">

          <a className="navbar-brand text-light" href="#">
            Admin Panel
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
              <Link to="/admin/dashboard" className="nav-link text-light" href="#">Dashboard</Link>
              <Link to="/admin/addon" className="nav-link text-light" href="#">Add-On</Link>
              <Link to="/admin/flight" className="nav-link text-light" href="#">Flights</Link>
              <Link to="/admin/listedproperty" className="nav-link text-light" href="#">Listed Property</Link>
              <Link to="/admin/vehicle" className="nav-link text-light" href="#">Vehicles</Link>
              <Link to="/admin/users" className="nav-link text-light" href="#">Users</Link>
              <Link to="/admin/owner" className="nav-link text-light" href="#">Owner</Link>
              <Link to="/admin/rental" className="nav-link text-light" href="#">Rentals</Link>
            </div>

          
            <div className="ms-auto">
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                >
                  {admin.name}
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

export default AdminNavbar
