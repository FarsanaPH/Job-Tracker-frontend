import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("jt_user");
  return user ? children : <Navigate to="/auth" replace />;
  // Can also Redux to get current user
  // const user = useSelector(state => state.user.currentUser);
}

export default ProtectedRoute;
