import React from 'react';

import Review from './Review';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';


function ReviewList (props) {


const reviews = props.reviews?.slice(0).reverse().map((review, idx) => {
    return <Review toggleUpdate={props.toggleUpdate} hotelId={props.hotelId} key ={idx} review={review}/>;
    
});
            
    return (

       
        <div style={{marginTop: 20, borderRadius: '2%', boxShadow:'2px 2px 10px 10px #F3E5F5'}}>
            <Box 
                sx={{backgroundColor: '#42A5F5', 
                borderBottom: '5px', 
                boxSizing: 'border-box', 
                }}>
              <Typography textAlign='center' 
                    padding='1rem' 
                    margin='0.2rem' 
                    color='#ECEFF1' 
                    fontWeight='500'
                    borderRadius='5px'  
                    variant='h6'
                    backgroundColor='#42A5F5'
                    >
                        Reviews 
                        <span style={{
                            color: '#FFF59D', 
                            fontSize: '75%', 
                            fontWeight: 400, letterSpacing:'.1rem',
                            fontStyle:'italic'}}>
                            ({props.reviews?.length} reviews)
                        </span>
              </Typography>
              <Divider/>
              {/* <Typography paddingTop='10px' paddingBottom='10px' paddingLeft='10px' textAlign='left' fontWeight='600' fontSize='3.5rem' 
              color={props.averageRating < 3 ? '#666' : (props.averageRating < 4 ? '#FB8C00' : '#FDD835')} sx={{textShadow:'2px 2px 2px #8D6E63'}}>{props.averageRating} </Typography> */}
            </Box>
                    {reviews}       
        </div>
    )
        
    

}

export default ReviewList;