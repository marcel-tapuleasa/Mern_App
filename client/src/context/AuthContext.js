import React, {createContext, useState} from 'react';

const AuthContext = createContext();
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
    // const token = localStorage.getItem('authToken');

    const [authState, setAuthState] = useState({
        token: null,
        expiresAt: null,
        userInfo: {}
    });

    const setAuthInfo = ({token, userInfo, expiresAt}) => {
        setAuthState({
            token,
            userInfo,
            expiresAt
        })

    }

    const isAuthenticated = () => {
        if(authState.token) {
        return true}
        return false
    }

    return (
        <Provider value={{
            authState,
            setAuthState: authInfo => setAuthInfo(authInfo),
            isAuthenticated
        }}>
            {children}
        </Provider>
    )
}

export {AuthContext, AuthProvider};