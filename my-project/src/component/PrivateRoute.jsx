import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useSelector(
        (state) => state.auth
    );

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;