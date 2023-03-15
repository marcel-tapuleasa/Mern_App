import React, {useContext, useEffect, useState} from 'react';
import axiosRender from '../../utils/axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';

import { UserContext } from '../../context/UserContext';
import Tooltip from '@mui/material/Tooltip';

function Review (props) {

    const {hotelId} = props; 
    
    const [userContext, setUserContext] = useContext(UserContext);
    
    const[reviewAuthor, setReviewAuthor] = useState('');

    useEffect(() => {
        async function getReviewDetails() {
            let res = await axiosRender.get(`/hotels/${hotelId}/reviews/${props.review._id}/reviewDetails`);
            // console.log('UseEffect Reviews Details!!!');
            setReviewAuthor(res.data.author.username);
        };
        getReviewDetails();
    },[props.review._id, hotelId])
  

    const deleteReviews = async () =>{

        const config = {
            
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${userContext.token}`,
            //   "Cookie": 'refreshToken'
            },
            withCredentials: true
        };

        await axiosRender.delete(`/hotels/${hotelId}/reviews/${props.review._id}`, null, config);
        props.toggleUpdate();
    }

    const {review} = props;
    // console.log(review);
    return(
        
            <Card sx={{borderRadius: 0, borderBottom: 'thin #212121'}}>
                <CardContent>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Tooltip  placement='right' title={userContext.details && userContext.details.username ? userContext.details.username : ''}>
                <Avatar sx={{ width: 30, height: 30, justifyContent: 'flex-start', margin:'8px' }} 
                src=
                {userContext.details && userContext.details.avatarImage ? userContext.details.avatarImage.url : 
                  '' }/></Tooltip>                
                  <CardActions sx={{alignSelf: 'flex-end'}}>
                    {userContext && userContext.details && reviewAuthor === userContext.details.username && 
                      <Button  hidden size='small' color='warning'  onClick={deleteReviews}><Tooltip title='Delete' placement='top'><DeleteIcon /></Tooltip></Button>}
                 </CardActions> </div>
                    <div style={{padding: '2% 3%', margin:'1%', backgroundColor: '#FAFAFA'}}>
                        <Typography gutterBottom variant='subtitle2' sx={{mb: '2px', textShadow: '7px 3px 2px 5px #2196F3'}}>Rating: {review.rating}</Typography>
                        <Typography gutterBottom variant='body2' sx={{mb: '4px'}}>"{review.body}"</Typography>
                    </div>
                    <Typography color='#E57373' fontWeight='500' variant='caption'>{`Posted by: ${reviewAuthor}`}</Typography>
                    <Typography sx={{marginLeft: '5px'}} color='pink' variant='caption'>{`${new Date().toLocaleString()}`}</Typography>
                </CardContent>
  
                
            </Card>
    
    )
}

export default Review;