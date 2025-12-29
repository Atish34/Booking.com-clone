import React from "react";
import { useSelector } from "react-redux";
import { useGetCustomerRentalQuery } from "../../redux/api/customerApi";
import { useNavigate } from "react-router-dom";

const Rentals = () => {
  const navigate = useNavigate()
  const customer = useSelector((state) => state.auth.customer);

  const {data,isSuccess,isLoading} = useGetCustomerRentalQuery()

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <h2 className="fw-bold">
            Car rentals made easy
            {customer?.name ? `, ${customer.name}` : ""}
          </h2>
          <p className="fs-5">
            Search, compare and book car rentals from trusted brands
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded shadow p-3 mt-4">
            <div className="row g-2 align-items-center">

              {/* Pick-up location */}
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pick-up location"
                />
              </div>

              {/* Pick-up date */}
              <div className="col-md-3">
                <input type="date" className="form-control" />
              </div>

              {/* Drop-off date */}
              <div className="col-md-3">
                <input type="date" className="form-control" />
              </div>

              {/* Search button */}
              <div className="col-md-2 d-grid">
                <button className="btn btn-primary fw-semibold">
                  Search
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

     <div className="container mt-5">
      <h4 className="fw-bold mb-1">Available car rentals</h4>
      <p className="text-muted mb-4">
        Choose from a wide range of rental cars
      </p>

      <div className="row g-4">
        {isSuccess && data?.result?.map((car) => (
          <div key={car.rentalId} className="col-md-6">
            <div className="card h-100 shadow-sm border-2">
              <div className="card-body">

                {/* Car Name */}
                <h5 className="fw-bold text-primary mb-1 text-capitalize">
                  {car.name}
                </h5>

                {/* Vehicle Type */}
                <span className="badge bg-light text-dark border mb-2">
                  {car.vtype}
                </span>

                {/* Details */}
                <ul className="list-unstyled mt-3 mb-3">
                  <li className="mb-1">
                    🚗 <strong>Capacity:</strong> {car.capacity} persons
                  </li>
                  <li className="mb-1">
                    ⛽ <strong>Fuel:</strong> {car.ftype}
                  </li>
                  <li className="mb-1">
                    🔢 <strong>Vehicle No:</strong> {car.number}
                  </li>
                </ul>

                {/* Availability */}
                {car.isAllow ? (
                  <span className="badge bg-success mb-3">Available</span>
                ) : (
                  <span className="badge bg-danger mb-3">Not Available</span>
                )}

                {/* Action */}
                <div className="text-end">
                  <button onClick={()=>navigate("/rcheckout",{state:{editData:car}})} className="btn btn-primary btn-sm fw-semibold">
                    View details
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
     <div className="container mt-5">
      <div className="row g-4 text-center">

        {/* Support */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 bg-success">
            <h5 className="fw-bold mb-2">We’re here for you</h5>
            <p className="text-muted mb-0">
              Customer support in over 30 languages
            </p>
          </div>
        </div>

        {/* Free cancellation */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 bg-success">
            <h5 className="fw-bold mb-2">Free cancellation</h5>
            <p className="text-muted mb-0">
              Up to 48 hours before pick-up, on most bookings
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="col-md-4">
          <div className="border rounded p-4 h-100 bg-success">
            <h5 className="fw-bold mb-2">5 million+ reviews</h5>
            <p className="text-muted mb-0">
              By real, verified customers
            </p>
          </div>
        </div>

      </div>
    </div>

      {/* Below content */}
      <div className="container mt-5">
        <h5 className="fw-semibold">Popular car rental destinations</h5>
        <p className="text-muted">
          Cars available in major cities across India
        </p>
      </div>
    </>
  );
};

export default Rentals;
