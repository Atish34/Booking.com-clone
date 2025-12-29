import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddCustomerHotelBookMutation } from '../../redux/api/customerApi';
import { toast } from 'react-toastify';

const Check = () => {
     const navigate = useNavigate();
      const { state } = useLocation();
    
      const { hotel, room,fromDate,toDate, totalAmount } = state || {};

      const [book,{isSuccess,isError,error,isLoading}] = useAddCustomerHotelBookMutation()
      

       useEffect(() => {
          if (isSuccess) {
            toast.success("hotel booked successfully!");
            navigate("/hsuccess", {
              state: {
                hotel,
                room,
                fromDate,
                toDate,
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
              hotelId: hotel._id,
              room,
              fromDate,
              toDate,
              hamount: totalAmount,
              hotel,
            });
          } catch (err) {
            console.error(err);
          }
        };
      
        return (
          <div className="container d-flex justify-content-center align-items-center mt-5 mb-5">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
      
              <div className="mb-2 d-flex justify-content-between">
                <span>Name</span>
                <strong>{hotel?.name}</strong>
              </div>
      
              <div className="mb-2 d-flex justify-content-between">
                <span>Type</span>
                <strong>{hotel?.ptype}</strong>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <span>Address</span>
                <strong>{hotel?.address}</strong>
              </div>

              <div className="mb-2 d-flex justify-content-between">
                <span>room</span>
                <strong>{room?.roomType}</strong>
              </div>
      
      
              <div className="mb-2 d-flex justify-content-between">
                <span>Date</span>
                <strong>
                  {fromDate} → {toDate}
                </strong>
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
   
}

export default Check