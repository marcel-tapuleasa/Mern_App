import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton  from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip , {tooltipClasses} from '@mui/material/Tooltip';

import AddReviewForm from '../review/AddReviewForm';
import ReviewList from '../review/ReviewList';
import { UserContext } from '../../context/UserContext';

import MapBoxHotel from './MapBoxHotel';

import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PlaceIcon from '@mui/icons-material/Place';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import useToggle from '../../hooks/useToggleState';
import EditHotelForm from './EditHotelForm';
import ManagePhotos from './ManagePhotos';

import { toast } from 'react-toastify';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));




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
        // console.log('1st UseEffect');
        async function getData() {
            const config = {
                credentials: "include",
                withCredentials: true,
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
}, [JSON.stringify(details), id, isUpdated, isEditing, isEditingPhotos])   
  

    const removeHotel = async (id) => {
        const config = {
            credentials: "include",
            withCredentials: true,
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer: ${userContext.token}`
            }
            
          }
       const promise =  axios.delete(`/hotels/${id}`, {_id:id}, config);
       toast.promise(promise, {
        pending: {
          render: 'Deleting your hotel...',
          // disable the delay for pending state
          delay: undefined
        },
        success: {render: 'Hotel deleted successfully!', delay: 500},
        error: 'Something went wrong.',
      }, {
      delay: 500
      })
        setTimeout(() => {navigate('/hotels')}, 2000)
    }

    const toggleUpdate = () => {
        setIsUpdated(prev => !prev)
    }

    const toggleEditPhotos = () => {
      setIsEditingPhotos(prev => !prev)
    }
 

    return(
        <>         
         {isEditing ? 
            <EditHotelForm 
              author={author} 
              title={details.title} 
              location={details.location} 
              id={details._id} 
              description={details.description} 
              price={details.price} 
              images={details.images}
              toggle={toggle}/> : 
                isEditingPhotos ? 
                <ManagePhotos
                    author={author} 
                    title={details.title} 
                    location={details.location} 
                    id={details._id} 
                    description={details.description} 
                    price={details.price} 
                    images={details.images}
                    toggle={toggleEditPhotos}/> : 
          
        (<Container>
                      <>
          <Grid container spacing={6} >
         
           <Grid item md={6} sx={{margin: '0 auto'}}>
            <Card sx={{ maxWidth: 600, marginTop: '7rem', borderRadius: '0.5rem', boxShadow: '10px 10px 20px -10px #EACDF2, -10px 0 20px -10px #EACDF2' }}>
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
                                objectFit: 'cover',
                                
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
                      <div style={{display: 'flex', justifyContent:'space-between'}}>
                        <div>
                        <Typography fontWeight='600' variant="h4">{details.title}</Typography>
                        <Typography color='#F9A825' variant='subtitle2'><PlaceIcon fontSize='medium'/>{details.location}</Typography>
                        </div>
                        <div style={{minWidth: '60px', backgroundColor: '#2196F3', borderRadius: '25% 10%', display:'flex', alignItems: 'center', justifyContent:'center'}}>
                        <Typography fontWeight= '500' color='white'sx={{justifySelf: 'flex-end'}} variant='h5'> {details.averageRating ? details.averageRating : '' }</Typography>
                        </div>
                      </div>
                        
                        
                       {/* <Link href={`/aboutme/${details?.author?._id}`}><Typography variant="h5" >Submitted by: {author}</Typography></Link>  */}
                       <Typography textAlign='end' color='#90A4AE' marginTop='5%' variant='subtitle2'>Submitted by: <Link color='#455A64' underline='hover' href={`/aboutme/${details?.author?._id}`}>{author}</Link></Typography>

                        
                    </div>
                    <hr></hr>
                <Typography marginTop='2%' variant="body1" color='text.secondary'>{details.description}</Typography>
                <Typography sx={{mt: '10%'}}  color="text.secondary" variant="subtitle2" textAlign='end'>
                  Price from  <span style={{fontSize:'2em', fontWeight:'600', color:'#9C27B0', marginTop:'5rem'}}>{details.price} 
                  <EuroSymbolIcon sx={{height: '1rem', fontSize:'0.9rem'}}/></span>  /night</Typography>
                </CardContent>
                <CardActions sx={{margin: '4em auto', justifyContent:'space-around', backgroundColor:'#FAFAFA', borderRadius:'3%', width: '50%'}}>

                  <LightTooltip title='Back'>
                    <IconButton aria-label='Go Back' href='/hotels'>
                      <KeyboardReturnIcon sx={{fontSize:'25px', color: '#455A64'}}/>
                    </IconButton>
                  </LightTooltip>
              
                  {userContext.details && author === userContext.details.username &&  
                  <>  
                  <LightTooltip title='Edit'>
                    <IconButton aria-label='Edit' onClick={toggle}>
                      <EditIcon sx={{fontSize:'25px', color:'#455A64'}}/>
                    </IconButton>
                  </LightTooltip>
                  <LightTooltip title='Manage Photos'>
                   <IconButton aria-label='Manage Photos' onClick ={toggleEditPhotos}>
                    <PhotoCameraIcon sx={{fontSize:'25px', color: '#455A64'}}/>
                   </IconButton>
                  </LightTooltip>
                  <LightTooltip title='Delete'>
                    <IconButton aria-label='Delete' onClick={()=>removeHotel(id)}>
                      <DeleteForeverIcon sx={{fontSize:'25px', color:'#D32F2F'}}/>
                    </IconButton>
                  </LightTooltip>
                  </>}

                </CardActions>  
                    
                    {userContext.token && 
            
            <AddReviewForm toggleUpdate={toggleUpdate} />}
           
            </Card >
     
            </Grid> 
            {details._id && !isEditing && !isEditingPhotos &&
          <Grid item xs={12} md={6} sx={{margin: '7rem auto'}}> 
          <div className='geo-container'>
              <MapBoxHotel 
                title={details.title} 
                description={details.description} 
                location={details.location} 
                hotelId={details._id}
              />
          </div>
          <div className='reviews-container'>
              <ReviewList 
                toggleUpdate={toggleUpdate} 
                hotelId= {details._id} 
                reviews={details.reviews} 
                averageRating={details.averageRating}
              />
          </div>
            </Grid>}
         </Grid></></Container>)
 } </>
      
    )
}

export default HotelDetails;