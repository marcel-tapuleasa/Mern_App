import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import AddReviewForm from '../review/AddReviewForm';
import ReviewList from '../review/ReviewList';
import { UserContext } from '../../context/UserContext';

import MapBoxHotel from './MapBoxHotel';

import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import useToggle from '../../hooks/useToggleState';
import EditHotelForm from './EditHotelForm';
import ManagePhotos from './ManagePhotos';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);









function HotelDetails (props) {
    const theme = useTheme();


    const [details, setDetails] = useState({});
    const [author, setAuthor] = useState();
    const[isEditing, toggle] = useToggle(false);
    const[isUpdated, setIsUpdated] = useState(false);
    const[isEditingPhotos, setIsEditingPhotos] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = details.images ? details.images.length : 0;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step) => {
        setActiveStep(step);
      };


    const [userContext, setUserContext] = useContext(UserContext);

    let {id} = useParams();
    let navigate = useNavigate();

   
     
    useEffect(() => {
        console.log('1st UseEffect');
        async function getData() {
            const config = {
                credentials: "include",
                headers: {
                  "Content-Type": 'application/json',
                  "Authorization": `Bearer: ${userContext.token}`
                }
                
              }
            let res = await axios.get(`/hotels/${id}`, {config});
            setDetails(prev => res.data);
            setAuthor(res.data.author.username);
        
    } 
            getData(); 
            // console.log(`This is from 1st useEffect: ${JSON.stringify(details.images)}`);

           
            return (() => setIsUpdated(!isUpdated))
}, [JSON.stringify(details), id, isUpdated])   
  

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

    const toggleEditPhotos = () => {
      setIsEditingPhotos(prev => !prev)
    }
 

    return(
        <div>
          <Grid container spacing={2}>
           <Grid item sm={8}>
            {isEditing ? <EditHotelForm 
              author={author} 
              title={details.title} 
              location={details.location} 
              id={details._id} 
              description={details.description} 
              price={details.price} 
              images={details.images}/> : (
                isEditingPhotos ? 
                <ManagePhotos
                    author={author} 
                    title={details.title} 
                    location={details.location} 
                    id={details._id} 
                    description={details.description} 
                    price={details.price} 
                    images={details.images}/> : 
            <Card sx={{ maxWidth: 600, mt: 15}}>
              <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                >
                    {details && details.images && details.images.map((i, index) => 
                    <div key ={i._id}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <CardMedia
                            component="img"
                            alt="hotel photos"
                            image={i.url}
                            key={i._id}
                            sx={{
                                height: 255,
                                display: 'block',
                                maxWidth: 600,
                                overflow: 'hidden',
                                width: '100%',
                              }}
                            />) : null}
                    </div>
                   
               )}
              </AutoPlaySwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    Next
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                    ) : (
                    <KeyboardArrowRight />
                    )}
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                    ) : (
                    <KeyboardArrowLeft />
                    )}
                    Back
                </Button>
                }
              />
                
               
                <CardContent>
                    <div>
                        <Typography gutterBottom variant="h3">{details.title}</Typography>
                        <Typography variant="h5" color="primary">{details.location}</Typography>
                       <Link href={`/aboutme/${details?.author?._id}`}><Typography variant="h5" >Submitted by: {author}</Typography></Link> 

                        
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
            <Button onClick ={toggleEditPhotos}>Manage Photos</Button>
            <Button color='warning' onClick={()=>removeHotel(id)}>Delete!</Button> 
            </>}

            </CardActions>  
            {userContext.token && <AddReviewForm toggleUpdate={toggleUpdate} />}          
             
            <ReviewList toggleUpdate={toggleUpdate} hotelId= {details._id} reviews={details.reviews}/>
            </Card>)}
            </Grid>
            <Grid item sm={4} sx={{marginTop: 15}}>{ details._id && <MapBoxHotel title={details.title} description={details.description} location={details.location} hotelId={details._id}/>}</Grid>
         </Grid>  
        </div>
    )
}

export default HotelDetails;