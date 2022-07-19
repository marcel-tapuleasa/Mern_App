import React, {createContext, useState} from 'react';

const UserContext = createContext();


let initialState = {};

const UserProvider = props => {
    const [state, setState] = useState(initialState)

    return(
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider };