import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Currency from "../../utils/currency";
import Language from "../../utils/Language";
import { useSelector } from "react-redux";
import { useLogoutCustomerMutation } from "../../redux/api/authApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PublicNavbar = () => {
  const [logout,{isSuccess}] = useLogoutCustomerMutation()
  const navigate = useNavigate()
  const {customer} = useSelector(state => state.auth)
  
   const [selectedCurrency, setSelectedCurrency] = useState("INR");
   const [selectedLanguage, setSelectedLanguage] = useState("English");

   useEffect(()=>{
    if(isSuccess){
    toast.success("logout success")
    navigate("/")
    }
   },[isSuccess])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          
          
          <a className="navbar-brand text-light" href="#">
            Booking.com
          </a>

         
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            
            <div className="navbar-nav mx-auto gap-5">
              <Link><a className="nav-link text-light" data-bs-toggle="modal" data-bs-target="#currencyModal">{selectedCurrency}</a></Link>
              <Link><a className="nav-link text-light" data-bs-toggle="modal" data-bs-target="#languageModal">{selectedLanguage}</a></Link>
              <Link to="/listProperty"><a className="nav-link text-light" href="#">List Your Property</a></Link>
              <button
            onClick={() => navigate("/cart")}
            className="btn btn-light"
          >
            All-Bookings
          </button>
            </div>

            <div className="d-flex gap-3">
              { customer
                ? <div class="dropdown">
                  <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                    {customer.name}
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" onClick={logout} href="#">Logout</a></li>
                  </ul>
                </div>
                : <>
                <button onClick={() => navigate("/customer-register")} className="btn btn-light">Register</button>
                <button onClick={()=>navigate("/customer-login")} className="btn btn-light">Sign In</button>
                </>
              }

            </div>
          </div>
        </div>
      </nav>

      <Currency setSelectedCurrency={setSelectedCurrency}/>
      <Language setSelectedLanguage={setSelectedLanguage}/>
    </>
  );
};

export default PublicNavbar;
