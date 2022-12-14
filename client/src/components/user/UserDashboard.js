import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography, Box, Card, List, ListItem, ListItemButton, ListItemText, Paper} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';


function UserDashboard(props) {

    const[userContext, setUserContext] = useContext(UserContext);
    const[userHotels, setUserHotels] = useState([]);

    

    useEffect(() => {
        async function getHotelData() {
            const config = {
                credentials: "include",
                headers: {
                  "Content-Type": 'application/json',
                  "Authorization": `Bearer: ${userContext.token}`
                }
                
              }
         const res = await axios.get(`/api/auth/userhotels/${userContext.details._id}`, config);    
         setUserHotels(res.data) 
        };
        getHotelData();
    }, [userContext])


    

    return(
            <Box sx={{ background: 'linear-gradient(134.87deg, #E6EE9C -20%, #29B6F6 109.89%)', borderRadius:{xs: '2%', sm: '3%', md:'5%'}, width: '100%', padding:'4%'}}>
            <Typography sx={{textAlign: 'center', color:'#37474F', paddingBottom:'5%', fontWeight:'900', letterSpacing:'2px'}} variant='h6'>
            {userHotels && userHotels.length > 0 ? 
            `You have ${userHotels.length} properties registered` : 'No properties added yet'}
            </Typography>
            <Box sx={{
                            
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center', 
                            alignItems: 'start',
                            backgroundColor: 'white', 
                            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)',
                            borderRadius:{xs: '2%', sm: '3%', md:'5%'}

                        }}>
            <List>
                {userHotels?.map(hotel => (
                    <ListItem key={hotel._id}>
                    <ListItemButton divider component="a" href={`/hotels/${hotel._id}`}>
                        <ListItemText primary={hotel.title} sx={{color: '#3949AB', '&:hover': {color: 'black'}}}/>
                        
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            </Box>
            </Box> 

   
    )
}

export default UserDashboard;