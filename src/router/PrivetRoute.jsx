import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoaderSpinner from "../shared/LoaderSpinner";

const PrivetRoute = ({ children }) => {
  const { userInfo, loding } = useContext(AuthContext);
  const location = useLocation();

  if (loding) {
    return <LoaderSpinner></LoaderSpinner>;
  }
  if (userInfo) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location }} replace={true}></Navigate>
  );
};

PrivetRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PrivetRoute;
