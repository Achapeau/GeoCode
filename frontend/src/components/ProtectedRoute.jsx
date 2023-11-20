import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ isAllowed, redirectPath = "/", children }) {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;

  return children || <Outlet />;
}
ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirectPath: PropTypes.string,
  children: PropTypes.node,
};
ProtectedRoute.defaultProps = {
  redirectPath: "/",
  children: null,
  isAllowed: false,
};
export default ProtectedRoute;
