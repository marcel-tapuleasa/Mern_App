import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import  Loader from  './Loader';
import { Container, Grid, Divider} from '@mui/material';

import UserPhoto from './UserPhoto';
import UserDashboard from './UserDashboard';
import UserWelcome from './UserWelcome';
import UserNavbar from './UserNavbar';



function Profile() {

    const [userContext, setUserContext] = useContext(UserContext);


    return  userContext.details ===  null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : 
    
          
            
        <Container>
             <Grid container spacing={4} sx={{marginTop:{xs:'15%', sm:'15%', md: '10%'}, display: 'flex', justifyContent:'center'}}>
                <Grid item xs={12} sm={5} md={5} sx={{display: 'flex', justifyContent:'space-around'}} >
                        <UserWelcome/>
                </Grid>
                <Grid item xs={12} sm={7} md={7} sx={{display: 'flex', justifyContent:'space-around'}}>
                    <UserNavbar/>
                </Grid> 
            </Grid> 
            <Divider sx={{marginY: '5%'}}/>
            <Grid container spacing={6}>    
                <Grid item xs={12} sm={4} md={5} sx={{display: 'flex', justifyContent:'space-around'}}>
                    <UserPhoto/>
                </Grid> 
                <Grid item xs={12} sm={8} md={7} sx={{display: 'flex', justifyContent:'space-around'}}>
                    <UserDashboard/>
                </Grid>
            </Grid>
        </Container>
     
};

export default Profile;