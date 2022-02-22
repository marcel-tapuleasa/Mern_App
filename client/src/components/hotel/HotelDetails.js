import React, {useState, useEffect} from 'react';
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



import useToggle from '../../hooks/useToggleState';
import EditHotelForm from './EditHotelForm';


function HotelDetails (props) {
    const [details, setDetails] = useState([]);
    const[isEditing, toggle] = useToggle(false);
    const[isUpdated, setIsUpdated] = useState(false)
    let {id} = useParams();
    let navigate = useNavigate();
   
     
    useEffect(() => {
        console.log('2nd UseEffect');
        async function getData() {
            let res = await axios.get(`http://localhost:5000/hotels/${id}`);
            setDetails(prev => res.data);} 
            getData();
            return (() => setIsUpdated(!isUpdated))
}, [JSON.stringify(details), isUpdated, id])   

  

    const removeHotel = async (id) => {
        await axios.delete(`http://localhost:5000/hotels/${id}`, {_id:id})
        navigate('/hotels')

    }

    const toggleUpdate = () => {
        setIsUpdated(prev => !prev)
    }
 


    return(
        <div>
           
            {isEditing ? <EditHotelForm title={details.title} location={details.location} id={details._id} description={details.description} price={details.price}/> :
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
                    </div>
                    <hr></hr>
                <Typography variant="body1" color="text.secondary">{details.description}</Typography>
                <Typography sx={{mt: 2}}  color="text.secondary" variant="h5">{`Price: ${details.price} USD/night`}</Typography>
                </CardContent>
                <CardActions sx={{margin: 'auto'}}>
            <Button href='/hotels'>Go Back</Button>
            <Button onClick={toggle}>Edit</Button> 
            <Button color='warning' onClick={()=>removeHotel(id)}>Delete!</Button>
            </CardActions>            
            <AddReviewForm toggleUpdate={toggleUpdate} /> 
            <ReviewList toggleUpdate={toggleUpdate} hotelId= {details._id} reviews={details.reviews}/>
            </Card>}

            
        </div>
    )
}

export default HotelDetails;