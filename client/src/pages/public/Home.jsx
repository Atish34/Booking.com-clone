import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/stays" && location.pathname === "/");

  return (
    <div className="bg-primary py-4">
      <div className="container">
        <div className="d-flex gap-3">
          <button
            onClick={() => navigate("/stays")}
            className={`btn px-4 fw-semibold ${
              isActive("/stays") ? "btn-light text-primary" : "btn-outline-light"
            }`}
          >
            Stays
          </button>

          <button
            onClick={() => navigate("/flight")}
            className={`btn px-4 fw-semibold ${
              isActive("/flight") ? "btn-light text-primary" : "btn-outline-light"
            }`}
          >
            Flights
          </button>

          <button
            onClick={() => navigate("/rentals")}
            className={`btn px-4 fw-semibold ${
              isActive("/rentals")
                ? "btn-light text-primary"
                : "btn-outline-light"
            }`}
          >
            Car Rentals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
