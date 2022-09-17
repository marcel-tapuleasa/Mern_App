import React, {useContext} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

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
    })



function AddReviewForm(props) {
    let {id} = useParams();
    let navigate = useNavigate();

    const [userContext, setUserContext] = useContext(UserContext);

    const onSubmit = async (values, {resetForm}) => {
       
        const {body, rating, id} = values;

        const config = {
            credentials: "include",
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer: ${userContext.token}`
            }
        };
            

        await axios.post(`/hotels/${id}/reviews`, { body: body, rating: rating}, config)
        console.log('AddReview');
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
            sx={{mt: '40px', maxWidth: 600}}>
                
            <Typography>Rating</Typography>
            <Slider
                sx={{mt:'10px', ml: '20px', maxWidth: 150, mb: '30px'}}
                aria-label="Review Rating"
                name='rating'
                defaultValue={1}
                // getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={5}
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.rating && Boolean(formik.errors.rating)}
                // helperText={formik.touched.rating && formik.errors.rating}

            />
            <Typography>Add a Review</Typography>
            <TextField
                fullWidth
                sx={{mt:'10px'}}
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
                type='submit'
                variant='contained'
                >Submit
            </Button>
        </Box>       

    </div>

    )

}


export default AddReviewForm;