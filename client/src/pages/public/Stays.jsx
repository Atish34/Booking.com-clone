import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCustomerPropertyQuery, useLazySearchCustomerPropertyQuery } from "../../redux/api/customerApi";
import { useNavigate } from "react-router-dom";

const Stays = () => {
  const navigate = useNavigate()

     const destinations = [
      { city: "New Delhi", count: "3,412 properties" },
      { city: "Bengaluru", count: "3,172 properties" },
      { city: "Mumbai", count: "1,782 properties" },
      { city: "Chennai", count: "1,360 properties" },
      { city: "Hyderabad", count: "1,855 properties" },
      { city: "Gurgaon", count: "1,565 properties" },
    ];

  const customer = useSelector((state) => state.auth.customer);
  const { data, isLoading, isSuccess } = useGetCustomerPropertyQuery();
  const [searchProperty,{ data:isData,isSuccess:searchSuccess,isLoading:searchLoading }] = useLazySearchCustomerPropertyQuery();

  const [searchData, setSearchData] = useState({
  destination: "",
  keyword: "",
  date: "",
});

const [isSearching, setIsSearching] = useState(false);

const propertyList =
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
            Where to next{customer?.name ? `, ${customer.name}` : ""}?
          </h2>
          <p className="fs-5">
            Find exclusive <span className="fw-semibold">Genius rewards</span>{" "}
            in every corner of the world!
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded shadow p-3 mt-4">
            <div className="row g-2">
              <div className="col-md-3">
                <input 
                value={searchData.destination}
                onChange={(e) =>
                  setSearchData({ ...searchData, destination: e.target.value })
                }
                className="form-control" placeholder="Where are you going?" />
              </div>
              <div className="col-md-3">
                <input
                    value={searchData.keyword}
                    onChange={(e) =>
                      setSearchData({ ...searchData, keyword: e.target.value })
                    }
                 className="form-control" placeholder="what you looking?" />
              </div>
              <div className="col-md-3">
                <input
                 value={searchData.date}
                 onChange={(e) =>
                   setSearchData({ ...searchData, date: e.target.value })
                 }
                type="date" className="form-control" />
              </div>
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

      {/* Property Cards */}
      <div className="container mt-5">

        {(isLoading || searchLoading) && <p>Loading...</p>}

        <div className="row">
    {
      propertyList?.map((item) => (
        <div key={item._id} className="col-lg-4 col-md-6 mb-4">
          <div onClick={()=>navigate("/checkout",{state:{editData:item}})} className="card h-100 shadow-sm border-0">
            
            {/* Image */}
            <img
              src={item.img?.[0]}
              alt={item.name}
              className="card-img-top"
              style={{ height: "220px", objectFit: "cover" }}
            />

            {/* Card body */}
            <div className="card-body d-flex flex-column">
              <h5 className="fw-bold text-primary mb-1">
                {item.name}
              </h5>

              <span className="badge bg-light text-dark border w-fit mb-2">
                {item.ptype.toUpperCase()}
              </span>

              <p className="text-muted mb-3">
                📍 {item.address}
              </p>

              {/* Button bottom-right */}
              {/* <div className="mt-auto d-flex justify-content-end">
                <button className="btn btn-primary btn-sm fw-semibold">
                  See availability
                </button>
              </div> */}
            </div>

          </div>
        </div>
      ))}
  </div>

  <h5 className="fw-semibold">Trending destinations</h5>
  <p className="text-muted">Most popular choices for travellers from India</p>

    <div className="container mt-5">
      {/* Heading */}
      <h4 className="fw-bold">Explore India</h4>
      <p className="text-muted">
        These popular destinations have a lot to offer
      </p>

      {/* Grid */}
      <div className="row mt-3">
        {destinations.map((item, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-3">
            <div className="border rounded p-3 h-100 cursor-pointer">
              <h6 className="fw-semibold mb-1">{item.city}</h6>
              <small className="text-muted">{item.count}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
    
      </div>
    </>
  );
};

export default Stays;
