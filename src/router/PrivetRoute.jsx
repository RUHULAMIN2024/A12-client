import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { userInfo, loding } = useContext(AuthContext);
  const location = useLocation();

  if (loding) {
    return (
      <div className="text-center mx-auto my-48">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  } else if (userInfo) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

PrivetRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivetRoute;
