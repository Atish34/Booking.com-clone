import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCustomerAirplaneQuery, useLazySearchCustomerAirplaneQuery } from "../../redux/api/customerApi";
import { useNavigate } from "react-router-dom";

const Flights = () => {
  const navigate = useNavigate()
  const customer = useSelector((state) => state.auth.customer);

  const countries = [
  { name: "United Kingdom" },
  { name: "India" },
  { name: "United Arab Emirates" },
  { name: "Singapore" },
];

  const {data,isSuccess,isLoading} = useGetCustomerAirplaneQuery()
   const [searchProperty,{ data:isData,isSuccess:searchSuccess,isLoading:searchLoading }] = useLazySearchCustomerAirplaneQuery();
  
    const [searchData, setSearchData] = useState({
    destination: "",
    keyword: "",
    date: "",
    date2: "",
  });
  
  const [isSearching, setIsSearching] = useState(false);
  
  const airplaneList =
    isSearching ? isData?.result : data?.result;
  
    if (isSearching && searchSuccess && isData?.result?.length === 0) {
    return (
      <div className="container mt-5 mb-5">
        <h4 className="fw-bold">No destination found</h4>
        <button
          className="btn btn-sm btn-info"
          onClick={() => {
            setIsSearching(false);   // 🔥 THIS IS THE KEY
          }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <h2 className="fw-bold">
            Find your next flight
            {customer?.name ? `, ${customer.name}` : ""} 
          </h2>
          <p className="fs-5">
            Compare flights from hundreds of airlines and book with confidence
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded shadow p-3 mt-4">
            <div className="row g-2 align-items-center">

              {/* From */}
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  value={searchData.destination}
                onChange={(e) =>
                  setSearchData({ ...searchData, destination: e.target.value })
                }
                  placeholder="From"
                />
              </div>

              {/* To */}
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  value={searchData.keyword}
                onChange={(e) =>
                  setSearchData({ ...searchData, keyword: e.target.value })
                }
                  placeholder="To"
                />
              </div>

              {/* Departure */}
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  value={searchData.date}
                onChange={(e) =>
                  setSearchData({ ...searchData, date: e.target.value })
                }
                />
              </div>

              {/* Return */}
              <div className="col-md-2">
                <input
                  type="date"
                  className="form-control"
                  value={searchData.date2}
                onChange={(e) =>
                  setSearchData({ ...searchData, data: e.target.value })
                }
                />
              </div>

              {/* Search Button */}
              <div className="col-md-2 d-grid">
                <button 
                className="btn btn-primary fw-semibold"
                 onClick={() => {
                        setIsSearching(true);
                       searchProperty(searchData);
                         setSearchData({
                          destination: "",
                          keyword: "",
                          date: "",
                          date2: "",
                        });
                  }}
                >
                  Search
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

          {/* Flights List */}
      <div className="container mt-5">
        {(isLoading || searchLoading) && <p>Loading flights...</p>}

        {
          airplaneList?.map((flight) => (
            <div key={flight._id} className="card bg-info shadow-sm border-0 mb-4">
              <div className="card-body">
                <div className="row align-items-center">

                  {/* Airline */}
                  <div className="col-md-3">
                    <h6 className="fw-bold mb-1">{flight.name}</h6>
                    <small className="text-muted">
                      Passenger Capacity {flight.number}
                    </small>
                  </div>

                  {/* Route */}
                  <div className="col-md-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <p>Leaving From</p>
                        <h6 className="fw-semibold mb-0">{flight.departTime}</h6>
                        <small className="text-muted text-capitalize">
                          {flight.from}
                        </small>
                         <small className="text-muted d-block mt-1">
                         {flight.departDate}
                          </small>
                      </div>

                      <div className="text-center px-3">
                        ✈
                        <div
                          style={{
                            height: "2px",
                            width: "60px",
                            background: "#190c0cff",
                            margin: "4px auto",
                          }}
                        />
                      </div>

                      <div>
                        <p>Going To</p>
                        <h6 className="fw-semibold mb-0">{flight.arriveTime}</h6>
                        <small className="text-muted text-capitalize">
                          {flight.to}
                        </small>
                         <small className="text-muted d-block mt-1">
                         {flight.arriveDate}
                        </small>
                      </div>
                    </div>

                  </div>

                  {/* Action */}
                  <div className="col-md-2 d-flex justify-content-end">
                   <h6 className="fw-bold mb-1">₹ {flight.amount}</h6>
                  </div>

                  <div className="col-md-2 text-end">
                    <button onClick={()=>navigate("/acheckout",{state:{editData:flight}})} className="btn btn-primary fw-semibold">
                      View details
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
      </div>
      
         <div className="container mt-5">
      {/* Title */}
      <h4 className="fw-bold mb-1">Explore by country</h4>
      <p className="text-muted mb-4">
        Discover trending destinations, just a flight away
      </p>

      {/* Country Cards */}
      <div className="row g-3">
        {countries.map((country, index) => (
          <div key={index} className="col-md-6">
            <div
              className="border rounded p-4 h-100 d-flex align-items-center justify-content-between hover-shadow"
              style={{ cursor: "pointer" }}
            >
              <h5 className="fw-semibold mb-0">{country.name}</h5>

              {/* Arrow icon */}
              <span className="text-muted fs-4">›</span>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Below content placeholder */}
      <div className="container mt-5">
        <h5 className="fw-semibold">Popular flight routes</h5>
        <p className="text-muted">
          Frequently booked flights from India
        </p>
      </div>
    </>
  );
};

export default Flights;
