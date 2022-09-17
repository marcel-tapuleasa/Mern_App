import React, { useContext, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import { UserContext } from '../../context/UserContext';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { ImageListItem } from '@mui/material';




const theme = createTheme();

const styles = {
  main: {
    margin: '7% auto',
    padding: '32px',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(6, 122, 184)',
    borderRadius: 3,
    backgroundColor: 'white',
    boxShadow: '5px 5px 20px -4px #EACDF2'

  },
  sloganText: {
    padding: '40px',
    color: '3C4257',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '30px'

  },
  inputField: {
  }
}

    // const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/png"
    ];

const validationSchema = yup.object().shape({
    title: yup
      .string('Enter Hotel Name')
      .required('Name is required'),
    location: yup
      .string('Enter location')
      .required('Location is required'),
    description: yup
    .string('Enter description')
    .min(20, 'Description shold be of minimum 20 characters length')
    .required('Description is required'),
    price: yup
    .number('Enter price')
    .min(0, 'Price should be greater than 0')
    .required('Price is required'),
    images: yup.mixed()
    // .test(
    //   'fileSize', 
    //   'File too large',
    //   value => value && value.size <= FILE_SIZE
    // )
    // .test(
    //   'fileFormat',
    //   'Unsupported file format',
    //   value => value && SUPPORTED_FORMATS.includes(value.type)
    // )
  });

function NewHotelForm (props) {

 

  const [userContext, setUserContext] = useContext(UserContext);


  let navigate = useNavigate();
  const {classes} = props;


  const onSubmit = async (values) => {

    const {title, location, description, price, images} = values;

    
    const formData = new FormData();

        // formData.append('images', images);
        images.forEach((image, index) => {formData.append('images', images[index])});
        formData.append('title', title);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('price', price);



    const config = {
      credentials: "include",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer: ${userContext.token}`
      }
      
    }
    await axios.post('/hotels/new', formData, config );
  
    navigate('/hotels')
    // {title: title, location: location, description: description, price: price}
};



const formik = useFormik({
    initialValues: {title: '', location: '', description: '', price: '', images:[]},
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit
});

return(
  <form
  encType='multipart/form-data'
            noValidate
            onSubmit={formik.handleSubmit}>

    <ThemeProvider theme={theme}>
      <CssBaseline />
            <Box
            // component='form'
            // encType='multipart/form-data'
            // noValidate
            // onSubmit={formik.handleSubmit}
            className={classes.main}
            >
              
                <Typography className={classes.sloganText}>Enlist your Hotel with us</Typography>
              <TextField
                fullWidth
                sx={{mt:'32px'}}
                variant='outlined'
                label='Hotel Name'
                name='title'
                value={formik.values.title}
                placeholder='Enter Hotel Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                />
                
            
             <TextField
                fullWidth
                className={classes.inputField}
                variant='outlined'
                sx={{mt:'32px',}}
                label='Location'
                name='location'
                value={formik.values.location}
                placeholder='Enter Location'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
                />
             <TextField
                sx={{mt:'32px'}}
                fullWidth
                className={classes.inputField}
                variant='outlined'
                label='Description'
                name='description'
                value={formik.values.description}
                placeholder='Enter Description'
                multiline
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                />

            <div>
            <MonetizationOnTwoToneIcon sx={{color: 'green', mt: 4}}/>     
            <TextField
                sx={{mt:'45px', mr: 'auto'}}
                id="filled-number"
                name='price'
                value={formik.values.price}
                label="Price/night"
                type="number"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
            />
            </div>

            <input 
            type='file'
            name='images'
            accept='image/*'
            multiple
            onChange={(e) => formik.setFieldValue('images', Array.from(e.target.files))}/>
                <Button
                    sx={{mt:'32px'}}
                    fullWidth
                    variant='contained'
                    type='submit'>Add Hotel
                </Button>
            
        </Box>
    </ThemeProvider>  
    </form>      
)

}

export default withStyles(styles)(NewHotelForm);
