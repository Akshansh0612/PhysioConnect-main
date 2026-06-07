import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "PHYSIO") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;