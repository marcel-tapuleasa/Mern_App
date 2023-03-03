import React, {useContext, useEffect, useState} from 'react';
import {Typography, Box, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';


function UserDashboard(props) {

    const[userContext, setUserContext] = useContext(UserContext);
    const[userHotels, setUserHotels] = useState([]);

    

    useEffect(() => {
        async function getHotelData() {
            const config = {
                credentials: "include",
                withCredentials: true,
                headers: {
                  "Content-Type": 'application/json',
                  "Authorization": `Bearer: ${userContext.token}`
                }
                
              }
         const res = await axios.get(`https://hoteltips.onrender.com/api/auth/userhotels/${userContext.details._id}`, config);    
         setUserHotels(res.data) 
        };
        getHotelData();
    }, [userContext])


    

    return(
            
            
            <Box sx={{
                            
                            // width: {xs: '100%', sm: '90%', md:'80%'},
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: 'white', 
                            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)',
                            borderRadius:'5px'

                        }}>
                         
                <Typography 
                    sx={{
                        textAlign: 'center', 
                        color:'#0277BD', 
                        paddingBottom:'5%',  
                        // letterSpacing:'1px', 
                        margin:'2rem auto',
                        fontSize:{xs: '1rem', sm: '1.2rem', md: '1.2rem'}, 
                        fontWeight:'600', 
                    }} 
                        variant='h6'>
                {userHotels && userHotels.length > 0 ? 
                `You have ${userHotels.length} properties registered` : 'No properties added yet'}
                </Typography>
          
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

   
    )
}

export default UserDashboard;