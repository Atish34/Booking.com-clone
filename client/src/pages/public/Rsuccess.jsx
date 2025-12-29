import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Rsuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    vehicle,
    pickup,
    pickupTime,
    drop,
    dropTime,
    passanger,
    capacity,
  } = state || {};

  return (
    <div className="container d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>

        <div className="text-center">
          <h2 className="text-success fw-bold mb-3">Success</h2>

          <button className="btn btn-success btn-lg w-100 mb-3">
            ✔ Payment Successful
          </button>

          <p className="text-muted">
            Your rental booking has been confirmed.
          </p>
        </div>

        <hr />

        {/* Vehicle Details */}
        <div className="mb-2 d-flex justify-content-between">
          <span>Vehicle</span>
          <strong className="text-capitalize">{vehicle?.name}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Vehicle No</span>
          <strong>{vehicle?.number}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Type</span>
          <strong className="text-uppercase">{vehicle?.vtype}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Fuel</span>
          <strong className="text-uppercase">{vehicle?.ftype}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Capacity</span>
          <strong>{capacity} Persons</strong>
        </div>

        <hr />

        {/* Pickup / Drop */}
        <div className="mb-2 d-flex justify-content-between">
          <span>Pickup</span>
          <strong className="text-capitalize">{pickup}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Pickup Time</span>
          <strong>{pickupTime}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Drop</span>
          <strong className="text-capitalize">{drop}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Drop Time</span>
          <strong>{dropTime}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>passanger no.</span>
          <strong>{passanger}</strong>
        </div>

        <button
          className="btn btn-outline-primary w-100 mt-4"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>

      </div>
    </div>
  );
};

export default Rsuccess;
