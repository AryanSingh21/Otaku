import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Route>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Route to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Route to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Route>
  );
};

export default ProtectedRoute;
