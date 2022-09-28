import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { UserContext } from '../../context/UserContext';

function Review (props) {

    const {hotelId} = props; 
    
    const [userContext, setUserContext] = useContext(UserContext);
    
    const[reviewAuthor, setReviewAuthor] = useState('');

    useEffect(() => {
        async function getReviewDetails() {
            let res = await axios.get(`/hotels/${hotelId}/reviews/${props.review._id}/reviewDetails`);
            // console.log('UseEffect Reviews Details!!!');
            setReviewAuthor(res.data.author.username);
        };
        getReviewDetails();
    },[props.review._id, hotelId])
  

    const deleteReviews = async () =>{

        const config = {
            credentials: "include",
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer: ${userContext.token}`
            }
        };

        await axios.delete(`/hotels/${hotelId}/reviews/${props.review._id}`, config);
        props.toggleUpdate();
    }

    const {review} = props;
    // console.log(review);
    return(
        <div>
            <Card>
                <CardContent>
                    <Typography sx={{mb: '1px'}}>Rating: {review.rating}</Typography>
                    <Typography sx={{mb: '3px'}}>{`Review: ${review.body}` }</Typography>
                    <Typography color='yellow' variant='body2'>{`Submited by: ${reviewAuthor}`}</Typography>
                    <Typography color='pink' variant='body2'>{`Submited on: ${new Date().toLocaleString()}`}</Typography>
                </CardContent>
                <CardActions>
                    {userContext && userContext.details && reviewAuthor === userContext.details.username && 
                    
                    <Button size='small' color='warning' onClick={deleteReviews}>Delete</Button>}
                 </CardActions>   
                
            </Card>
        </div>
    )
}

export default Review;