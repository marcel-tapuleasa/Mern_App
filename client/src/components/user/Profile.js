import React, {useContext, useCallback, useEffect} from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import  Loader from  './Loader';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Alert, Typography, Grid, Divider } from '@mui/material';

import UserPhoto from './UserPhoto';
import UserDashboard from './UserDashboard';


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


    return  userContext.details ===  null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : 
    
          
            
                // <div >
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Box sx={{ width: '100%', marginTop: '200px', hight: '300px', backgroundColor: '#19e0e3'}}>
                    <Typography variant='h5' style={{marginTop: '300px', backgroundColor: '#19e0e3', textAlign: 'center', color:'#941940', hight: '300px'}}>
                Welcome, {userContext.details.username}!</Typography></Box>
                <Grid container spacing={20}>
                    <UserPhoto/>
                    <UserDashboard/>
                </Grid>

                </Container>
            {/* </div> */}
       
        
        
};

export default Profile;