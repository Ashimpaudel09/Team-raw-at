// ProtectedRoute.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import NoteContext from '../context/NoteContext';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    // const { authToken } = useContext(NoteContext);
    const authToken = localStorage.getItem("user_token");

    useEffect(() => {
        if (!authToken) {
            navigate("/login", { state: { from: window.location.pathname } });
        }
    }, [authToken, navigate]);
    return authToken ? children : null;
};

export default ProtectedRoute;
