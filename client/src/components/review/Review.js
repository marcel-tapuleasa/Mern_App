import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

function Review (props) {

    const {hotelId} = props;  
  

    const deleteReviews = async () =>{
        await axios.delete(`http://localhost:5000/hotels/${hotelId}/reviews/${props.review._id}`);
        props.toggleUpdate();
    }

    const {review} = props;
    return(
        <div>
            <Card>
                <CardContent>
                    <Typography sx={{mb: '1px'}}>Rating: {review.rating}</Typography>
                    <Typography sx={{mb: '3px'}}>{`Review: ${review.body}` }</Typography>
                    <Typography color='pink' variant='body2'>{`Submited on: ${new Date().toLocaleString()}`}</Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' color='warning' onClick={deleteReviews}>Delete</Button>
                 </CardActions>   
                
            </Card>
        </div>
    )
}

export default Review;