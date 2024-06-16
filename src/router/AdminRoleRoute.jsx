import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router";
import useAdminRole from "../hooks/useAdminRole";
import useAuth from "../hooks/useAuth";
import LoaderSpinner from "../shared/LoaderSpinner";

function AdminRoleRoute({ children }) {
  const [isAdminRole, isAdminRoleLoading] = useAdminRole();
  const { userInfo, userLoading } = useAuth();
  const location = useLocation();

  if (userLoading || isAdminRoleLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }
  if (userInfo && isAdminRole) {
    return children;
  }
  return (
    <Navigate to="/login" state={{ from: location }} replace={true}></Navigate>
  );
}
AdminRoleRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoleRoute;
