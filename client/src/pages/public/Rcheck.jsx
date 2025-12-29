import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddCustomerRentalBookMutation } from "../../redux/api/customerApi";

const Rcheck = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    vehicleId,
    pickup,
    pickupTime,
    drop,
    dropTime,
    capacity,
    passanger,
    vehicle,
  } = state || {};

  const [bookRental, { isLoading, isSuccess, isError, error }] =
    useAddCustomerRentalBookMutation();

  // ✅ Navigate only after success
  useEffect(() => {
    if (isSuccess) {
      toast.success("Vehicle booked successfully!");
      navigate("/rsuccess", {
        state: {
          vehicle,
          pickup,
          pickupTime,
          drop,
          dropTime,
          passanger,
          capacity,
        },
      });
    }

    if (isError) {
      toast.error(error?.data?.message || "Rental booking failed");
    }
  }, [isSuccess, isError]);

  const handleConfirm = async () => {
    await bookRental({
      vehicleId,
      pickup,
      pickupTime,
      drop,
      dropTime,
      passanger,
      capacity,
      vehicle,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>

        {/* Vehicle Info */}
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
          <strong className="text-capitalize">{pickupTime}</strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Drop</span>
          <strong className="text-capitalize">{drop}</strong>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>Drop Time</span>
          <strong className="text-capitalize">{dropTime}</strong>
        </div>
        <div className="mb-2 d-flex justify-content-between">
          <span>passanger no.</span>
          <strong className="text-capitalize">{passanger}</strong>
        </div>

        <button
          className="btn btn-outline-primary w-100 mt-4"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Confirm Rental"}
        </button>

      </div>
    </div>
  );
};

export default Rcheck;
