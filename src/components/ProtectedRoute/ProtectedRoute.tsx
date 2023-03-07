import React, {FC} from 'react';
import { Outlet } from 'react-router'
import { Navigate } from "react-router-dom";
import Header from "../Header/Header";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isLoggedIn }) => {
  return (
    isLoggedIn ? <Outlet/> : <Navigate to="/" replace={true} />
  );
};

export default ProtectedRoute;
