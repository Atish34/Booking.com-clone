import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Rcheckout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const vehicle = state?.editData; // rental vehicle data

  const [pickup, setPickup] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [drop, setDrop] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [passanger, setPassanger] = useState("");

  const handleCheckout = () => {
    if (!pickup || !drop) {
      alert("Please enter pickup and drop locations");
      return;
    }
    if (!pickupTime || !dropTime) {
      alert("Please enter pickup and drop Time");
      return;
    }

    navigate("/rcheck", {
      state: {
        vehicleId: vehicle._id,
        pickup,
        pickupTime,
        drop,
        dropTime,
        passanger,
        capacity: vehicle.capacity,
        vehicle,
      },
    });
  };

  return (
    <div className="container mt-3">
      <div className="card shadow-sm p-3 mb-3">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0 text-capitalize">{vehicle?.name}</h5>
          <span className="badge bg-primary text-uppercase">
            {vehicle?.vtype}
          </span>
        </div>

        <p className="text-muted mb-1">
          Vehicle No: <strong>{vehicle?.number}</strong>
        </p>

        <p className="text-muted mb-1">
          Fuel Type: <strong>{vehicle?.ftype}</strong>
        </p>

        <p className="text-muted mb-2">
          Capacity: <strong>{vehicle?.capacity} Persons</strong>
        </p>

        <hr />

        {/* Pickup & Drop Inputs */}
        <div className="row">
          <div className="col-2">
            <input
              type="text"
              className="form-control"
              placeholder="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          <div className="col-2">
            <input
              type="time"
              className="form-control"
              placeholder="Pickup time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
          </div>

          <div className="col-2">
            <input
              type="text"
              className="form-control"
              placeholder="Drop location"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
            />
          </div>
          <div className="col-2">
            <input
              type="time"
              className="form-control"
              placeholder="Drop Time"
              value={dropTime}
              onChange={(e) => setDropTime(e.target.value)}
            />
          </div>

           <div className="col-2">
            <input
              type="text"
              className="form-control"
              placeholder="no.of passanger"
              value={passanger}
              onChange={(e) => setPassanger(e.target.value)}
            />
          </div>

        <div className="col-2">
        <button
          onClick={handleCheckout}
          className="btn btn-success"
          >
          Proceed to Checkout
        </button>
        </div>
    </div>
      </div>
    </div>
  );
};

export default Rcheckout;
