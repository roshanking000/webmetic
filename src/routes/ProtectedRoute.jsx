import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../provider/authProvider";
import BaseLayout from "../layouts/baselayout";

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useAuth();
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      setChecked(isAuthenticated);
    }
  }, [isInitialized, isAuthenticated]);

  if (checked == null) {
    return null;
  }

  // If authenticated, render the child routes
  if (checked === true) {
    return (
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    );
  }

  // Check if the user is authenticated
  else {
    // If not authenticated, redirect to the login page
    return <Navigate to="/signin" />;
  }
};

export default ProtectedRoute;
