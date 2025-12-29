import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const hotel = state?.editData;

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleCheckout = () => {
    if (!selectedRoom) {
      alert("Please select a room");
      return;
    }
    if (!fromDate) {
      alert("Please select a from date");
      return;
    }
    if (!toDate) {
      alert("Please select a to date");
      return;
    }

    navigate("/check", {
      state: {
        hotel,
        room: selectedRoom,
        fromDate,
        toDate,
        totalAmount: selectedRoom.price,
      },
    });
  };

  return (
    <div className="container mt-3">
      <div className="card shadow-sm p-3 mb-3">
        <h5 className="mb-1 text-capitalize">{hotel?.name}</h5>

        <p className="text-muted mb-1 text-capitalize">
          Property Type: <strong>{hotel?.ptype}</strong>
        </p>

        <p className="text-muted mb-3">
          📍 <strong>{hotel?.address}</strong>
        </p>

        {/* Images */}
        <div className="row g-2 mb-3">
          {hotel?.img?.map((image, index) => (
            <div key={index} className="col-6">
              <img
                src={image}
                alt={`hotel-${index}`}
                className="img-fluid rounded"
                style={{ height: "140px", objectFit: "cover", width: "100%" }}
              />
            </div>
          ))}
        </div>

        <hr />

        {/* Rooms */}
        <div className="mt-3">
          {hotel?.room?.length > 0 ? (
            hotel.room.map((room) => (
              <div
                key={room._id}
                className={`d-flex justify-content-between align-items-center border rounded p-2 mb-2 ${
                  selectedRoom?._id === room._id
                    ? "border-primary bg-light"
                    : ""
                }`}
              >
                <div>
                  <strong>{room.roomType}</strong>
                  <div className="text-muted small">
                    Free cancellation • Pay at property
                  </div>
                </div>

                <div className="text-end">
                  <div className="fw-bold text-success">
                    ₹{room.price}
                  </div>

                  <button
                    className={`btn btn-sm mt-1 ${
                      selectedRoom?._id === room._id
                        ? "btn-success"
                        : "btn-primary"
                    }`}
                    onClick={() => handleSelectRoom(room)}
                  >
                    {selectedRoom?._id === room._id
                      ? "Selected"
                      : "Select"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <span className="text-muted">No rooms available</span>
          )}
        </div>
        <hr/>
        {/* Checkout Button */}
       <div className="row align-items-end g-2">
         <div className="col-md-3">
         <span>From Date</span>
           <input
             type="date"
             className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
           />
         </div>
       
         <div className="col-md-3">
           <span>To Date</span>
           <input
             type="date"
             className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
           />
         </div>
       
         <div className="col-md-4 text-end">
           <button
             className="btn btn-success px-4"
             disabled={!selectedRoom}
             onClick={handleCheckout}
           >
             Checkout
           </button>
         </div>
       </div>
       
      </div>
    </div>
  );
};

export default CheckOut;
