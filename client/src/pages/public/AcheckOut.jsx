import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AcheckOut = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editData = state?.editData;

  const [passengers, setPassengers] = useState("");

  const handleCheckout = () => {
    if (!passengers || passengers <= 0) {
      alert("Please enter valid number of passengers");
      return;
    }

    navigate("/acheck", {
      state: {
        editData,
        passengers,
        totalAmount: passengers * editData.amount,
      },
    });
  };

  return (
    <div className="container mt-3">
      <div className="card shadow-sm p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">{editData?.name}</h5>
          <span className="badge bg-primary">₹{editData?.amount}</span>
        </div>

        <p className="text-muted mb-2">
          Flight No: <strong>{editData?.number}</strong>
        </p>

        <div className="row">
          <div className="col-6">
            <h6 className="text-secondary">From</h6>
            <p className="mb-1 text-capitalize">{editData?.from}</p>
            <small>
              {editData?.departDate} | {editData?.departTime}
            </small>
          </div>

          <div className="col-6 text-end">
            <h6 className="text-secondary">To</h6>
            <p className="mb-1 text-capitalize">{editData?.to}</p>
            <small>
              {editData?.arriveDate} | {editData?.arriveTime}
            </small>
          </div>
        </div>

        <hr />

        <div className="d-flex align-items-center gap-2">
          <input
            type="number"
            className="form-control w-50"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            placeholder="Enter no. of passengers"
          />

          <button onClick={handleCheckout} className="btn btn-success w-50">
            Checkout
          </button>
        </div>

        {passengers > 0 && (
          <p className="mt-2 text-end fw-bold">
            Total: ₹{passengers * editData.amount}
          </p>
        )}
      </div>
    </div>
  );
};

export default AcheckOut;
