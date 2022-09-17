import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography, Box, Card, List, ListItem, ListItemButton, ListItemText, Link} from '@mui/material';
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
        <Grid item sm={12} md={8}>
        <Typography sx={{textAlign: 'center', marginY: '15px'}} component="h2">User Dashboard will be here!</Typography>
        <Box sx={{
                            height: 500,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center', alignItems: 'start',
                            backgroundColor: '#bfb0be',
                            '&:hover': {
                            backgroundColor: '#f5f0f4',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}>
            <List>
                {userHotels?.map(hotel => (
                    <ListItem key={hotel._id}>
                    <ListItemButton component="a" href={`/hotels/${hotel._id}`} divider>
                        <ListItemText primary={hotel.title}/>
                        
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Box>


    </Grid>
    )
}

export default UserDashboard;