import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddCustomerAirplaneBookMutation } from "../../redux/api/customerApi";
import { toast } from "react-toastify";

const Acheck = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { editData, passengers, totalAmount } = state || {};

  const [book, { isLoading, isSuccess, isError, error }] =
    useAddCustomerAirplaneBookMutation();

  // ✅ Navigate only AFTER successful booking
  useEffect(() => {
    if (isSuccess) {
      toast.success("Flight booked successfully!");
      navigate("/asuccess", {
        state: {
          editData,
          passengers,
          totalAmount,
        },
      });
    }

    if (isError) {
      toast.error(error?.data?.message || "Booking failed");
    }
  }, [isSuccess, isError]);

  const handleConfirm = async () => {
    try {
      await book({
        flightId: editData._id,
        passengers,
        bamount: totalAmount,
        editData,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>

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
          <span>Date</span>
          <strong>
            {editData?.departDate} → {editData?.arriveDate}
          </strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Time</span>
          <strong>
            {editData?.departTime} → {editData?.arriveTime}
          </strong>
        </div>

        <div className="mb-2 d-flex justify-content-between">
          <span>Passengers</span>
          <strong>{passengers}</strong>
        </div>

        <hr />

        <div className="d-flex justify-content-between fs-5">
          <span>Total Paid</span>
          <strong className="text-success">₹{totalAmount}</strong>
        </div>

        <button
          className="btn btn-outline-primary w-100 mt-4"
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Confirm Booking"}
        </button>

      </div>
    </div>
  );
};

export default Acheck;
