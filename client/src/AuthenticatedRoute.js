import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from './context/UserContext';

const AuthenticatedRoute = ({children}) => {
    const userContext = useContext(UserContext);
    return userContext.token ? (
      <>{children}</>
    ) : (<Navigate to='/login'/>)
  }

  export default AuthenticatedRoute;