import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { hotel, room, fromDate, toDate, totalAmount } = state || {};

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
      <div
        className="card shadow-lg p-4 w-100 text-center"
        style={{ maxWidth: "550px" }}
      >
        {/* Success Icon */}
        <div className="mb-3">
          <div
            className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center"
            style={{ width: "70px", height: "70px", fontSize: "32px" }}
          >
            ✓
          </div>
        </div>

        <h4 className="fw-bold text-success mb-1">
          Booking Confirmed!
        </h4>
        <p className="text-muted mb-4">
          Your hotel booking has been successfully completed
        </p>

        {/* Hotel Info */}
        <div className="text-start">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Hotel</span>
            <strong className="text-capitalize">{hotel?.name}</strong>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Room</span>
            <strong className="text-capitalize">{room?.roomType}</strong>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Stay</span>
            <strong>
              {fromDate} → {toDate}
            </strong>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Location</span>
            <strong className="text-capitalize">{hotel?.address}</strong>
          </div>
        </div>

        <hr />

        {/* Amount */}
        <div className="d-flex justify-content-between fs-5 mb-4">
          <span>Total Paid</span>
          <strong className="text-success">₹{totalAmount}</strong>
        </div>

        {/* Actions */}
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default HSuccess;
