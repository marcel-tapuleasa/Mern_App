import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddReviewForm from '../review/AddReviewForm';
import ReviewList from '../review/ReviewList';
import { UserContext } from '../../context/UserContext';



import useToggle from '../../hooks/useToggleState';
import EditHotelForm from './EditHotelForm';


function HotelDetails (props) {
    const [details, setDetails] = useState([]);
    const [author, setAuthor] = useState()
    const[isEditing, toggle] = useToggle(false);
    const[isUpdated, setIsUpdated] = useState(false);

    const [userContext, setUserContext] = useContext(UserContext);
    let {id} = useParams();
    let navigate = useNavigate();

   
     
    useEffect(() => {
        console.log('2nd UseEffect');
        async function getData() {
            const config = {
                credentials: "include",
                headers: {
                  "Content-Type": 'application/json',
                  "Authorization": `Bearer: ${userContext.token}`
                }
                
              }
            let res = await axios.get(`/hotels/${id}`, {config});
            console.log(res);
            setDetails(prev => res.data);
            setAuthor(res.data.author.username)
        
    } 
            getData();
            return (() => setIsUpdated(!isUpdated))
}, [JSON.stringify(details), isUpdated, id])   

  

    const removeHotel = async (id) => {
        const config = {
            credentials: "include",
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer: ${userContext.token}`
            }
            
          }
        await axios.delete(`/hotels/${id}`, {_id:id}, config)
        navigate('/hotels')
    }

    const toggleUpdate = () => {
        setIsUpdated(prev => !prev)
    }
 

    return(
        <div>
           
            {isEditing ? <EditHotelForm author={author} title={details.title} location={details.location} id={details._id} description={details.description} price={details.price}/> :
            <Card sx={{ maxWidth: 600, mt: 3}}>
                <CardMedia
                    component="img"
                    alt="generic hotel"
                    height="240"
                    image="https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                />
                <CardContent>
                    <div>
                        <Typography gutterBottom variant="h3">{details.title}</Typography>
                        <Typography variant="h5" color="primary">{details.location}</Typography>
                        <Typography variant="h5" >Submitted by: {author}</Typography>

                        
                    </div>
                    <hr></hr>
                <Typography variant="body1" color="text.secondary">{details.description}</Typography>
                <Typography sx={{mt: 2}}  color="text.secondary" variant="h5">{`Price: ${details.price} USD/night`}</Typography>
                </CardContent>
                <CardActions sx={{margin: 'auto'}}>
            <Button href='/hotels'>Go Back</Button>
            {userContext.details && author === userContext.details.username &&  
            <>           
            <Button onClick={toggle}>Edit</Button> 
            <Button color='warning' onClick={()=>removeHotel(id)}>Delete!</Button> 
            </>}

            </CardActions>  
            {userContext.token && <AddReviewForm toggleUpdate={toggleUpdate} />}          
             
            <ReviewList toggleUpdate={toggleUpdate} hotelId= {details._id} reviews={details.reviews}/>
            </Card>}

            
        </div>
    )
}

export default HotelDetails;