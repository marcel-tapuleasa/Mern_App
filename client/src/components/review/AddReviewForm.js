import React, {useContext} from 'react';
import axiosRender from '../../utils/axios';
import {useParams, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';

import { UserContext } from '../../context/UserContext';

import { useFormik} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    body: yup
            .string('Enter your review')
            .required('Enter a valid review'),
    rating: yup
              .number()
              .required('Give a rating')  
    });

const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent'
      };
      
function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }
      



function AddReviewForm(props) {
    let {id} = useParams();
    let navigate = useNavigate();

    const [userContext, setUserContext] = useContext(UserContext);
    const [hover, setHover] = React.useState(-1);



    const onSubmit = async (values, {resetForm}) => {
       
        const {body, rating, id} = values;

        // const config = {
        //     headers: {
        //       "Authorization": `Bearer ${userContext.token}`
        //     }
            
        // };
            

        await axiosRender.post(`/hotels/${id}/reviews`, { body: body, rating: rating}, {headers: {
            "Authorization": `Bearer ${userContext.token}`
          }})
        // console.log('AddReview');
        props.toggleUpdate();
        resetForm({values: ''})
        navigate(`/hotels/${id}`)
    }
    
    const formik = useFormik({
        initialValues: {body: '', rating: 1, id:id},
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit
    });

    return(
    <div>
        <Box 
            component='form'
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{mt: '20px', backgroundColor:'#42A5F5', boxShadow: '0px 2px 2px 3px #E1BEE7', borderRadius:'46% 1% 30% 40%'}}>
                <Typography paddingTop='20px' textAlign='center' variant='body1' fontWeight='600' color='#ECEFF1' letterSpacing='.2rem'> Share your experience...</Typography>
                <Box sx={{backgroundColor:'#BBDEFB', borderRadius:'30% 0% 2% 1%'}}>
            
                <Typography 
                    paddingTop='10%' 
                    marginTop='1%' 
                    component='legend' 
                    color='#263238'  
                    fontWeight='400' 
                    variant='subtitle2' 
                    marginLeft='10%' 
                    textshadow='10px 10px 100px 100px yellow'>Rate</Typography>
                <Box
                    sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft:'5%'
                    }}
                >
                    <Rating
                        size='large'
                        getLabelText={getLabelText}
                        aria-label="Review Rating"
                        name='rating'
                        defaultValue={3}
                        // getAriaValueText={valuetext}
                        valuelabeldisplay="auto"
                        step={1}
                        min={1}
                        max={5}
                        value={formik.values.rating}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.rating && Boolean(formik.errors.rating)}
                    
                    /> 
                    {formik.values.rating !== null && (
                    <Box sx={{ ml: 2, color:'white' }}>{labels[hover !== -1 ? hover : formik.values.rating]}
                    </Box>)}
                </Box>
            
                <Typography mt='7%' marginLeft='10%' color='#263238'  fontWeight='400' variant='subtitle2'>Write a Review</Typography>
                <TextField
                
                    sx={{margin:'10px 2%', width: '96%', backgroundColor:'white'}}
                    variant='outlined'
                    label='Add Review'
                    name='body'
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}

                />   
                <Button
                    sx={{margin: '3%', backgroundColor:'#FBC02D'}} 
                    type='submit'
                    variant='contained'
                    >Post
                </Button></Box>
        </Box>      

    </div>

    )

}


export default AddReviewForm;