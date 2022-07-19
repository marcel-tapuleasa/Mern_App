import React, {useContext, useCallback, useEffect} from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import  Loader from  './Loader';


function Profile() {

    const [userContext, setUserContext] = useContext(UserContext);

    // const fetchUserDetails = useCallback(async () => {
    //     const config = {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${userContext.token}`,
    //           }
    //     }

    //     const res = await axios.get('/api/users/me', config);
    //             setUserContext(oldValues => {
    //                 return { ...oldValues, details: res.data };
    //             })
               

    // }, [setUserContext, userContext.token]);


    // useEffect(() => {
    //     console.log('useEffect for Profile!!!')
    // // fetch only when user details are not present                   
    //     if (!userContext.details) {
    //          fetchUserDetails()
    //     }
    // }, [userContext.details, fetchUserDetails]);


    return  userContext.details === null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : 
        (<div style = {{marginTop: 300, backgroundColor: 'pink', textAlign: 'center'}}>
        <p>Welcome, {userContext.details.username}</p>
        </div>
        )
};

export default Profile;