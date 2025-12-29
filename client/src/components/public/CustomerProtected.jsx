import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const CustomerProtected = ({ compo }) => {
  const customer = useSelector((state) => state.auth.customer);
  const location = useLocation();

  if (!customer) {
    return (
      <Navigate
        to="/customer-login"
        replace
        state={{ from: location }}
      />
    );
  }

  return compo;
};

export default CustomerProtected;
