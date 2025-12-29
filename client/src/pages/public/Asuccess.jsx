import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Asuccess = () => {
    const navigate = useNavigate()
    const { state } = useLocation();

  const { editData, passengers, totalAmount } = state || {};
  
  return (
     <div className="container d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>

        <div className="text-center">
          <h2 className="text-success fw-bold mb-3">
            Success
          </h2>

          <button className="btn btn-success btn-lg w-100 mb-3">
            ✔ Payment Successful
          </button>

          <p className="text-muted">
            Your booking has been confirmed.
          </p>
        </div>

        <hr />

        <div className="mb-2 d-flex justify-content-between">
          <span>Airline</span>
          <strong>{editData?.name}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Flight No</span>
          <strong>{editData?.number}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Route</span>
          <strong className="text-capitalize">
            {editData?.from} → {editData?.to}
          </strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Passengers</span>
          <strong>{passengers}</strong>
        </div>

        <hr />

        <div className="d-flex justify-content-between fs-5">
          <span>Total Paid</span>
          <strong className="text-success">
            ₹{totalAmount}
          </strong>
        </div>

        <button
          className="btn btn-outline-primary w-100 mt-4"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>

      </div>
    </div>
  )
}

export default Asuccess