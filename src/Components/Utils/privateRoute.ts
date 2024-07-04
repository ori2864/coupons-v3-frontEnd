import React from 'react';
import { checkAuth } from './checkAuth';
import { Route, useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ComponentType;
    allowedRoles: string[];
    path: string;
}
const navigate = useNavigate();

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, allowedRoles, ...rest }) => {
//     const isAuthorized = allowedRoles.some(role => checkAuth(role));

//     return (
//         "iwji"
//         // <Route {...rest} element={isAuthorized ? <Component /> : navigate to="/login"}/>
     
//     )
// };

// export default PrivateRoute;
