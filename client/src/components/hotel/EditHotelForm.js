import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { withStyles } from "@mui/styles";
import { UserContext } from '../../context/UserContext';
import CardMedia from '@mui/material/CardMedia';




const styles = {
main: {
    margin: '7% auto',
    padding: '2px',
    width: '40%',
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
    padding: '30px',
    color: '3C4257',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '30px'

  }}

const validationSchema = yup.object({
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

  });


function EditHotelForm(props) {
    let navigate = useNavigate();

    const[userContext, setUserContext] = useContext(UserContext);

const {title, location, description, price, id, classes, author, images} = props;


    const editHotel = (values) => {
        const {id} = values;

        // const formData = new FormData();

        // // formData.append('images', images);
        // values.images.forEach((image, index) => {formData.append('images', values.images[index])});
        // formData.append('title', title);
        // formData.append('location', location);
        // formData.append('description', description);
        // formData.append('price', price);
       
    


        const config = {
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer: ${userContext.token}`
            }
            
          }
// { title: values.title, location: values.location, description: values.description, price: values.price}
        axios.put(`/hotels/${id}/edit`, { title: values.title, location: values.location, description: values.description, price: values.price}, config)
        .then(()=> {
            alert('It worked')})
        .catch(()=> {
            alert('Error!!!')})
            navigate('/hotels')
    };

    const formik = useFormik({
        initialValues: {title: title, location: location, description: description, price: price, id: id},
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit: editHotel
    }); 


    // const handleCheckBoxchange = (event) => {
    //   let updatedList = [...checkedImagestoDelete];
    //   if (event.target.checked) {
    //     updatedList = [...checkedImagestoDelete, event.target.value];
    //   } else {
    //     updatedList.splice(checkedImagestoDelete.indexOf(event.target.value), 1);
    //   }
    //   setCheckedImagestoDelete(updatedList);
    //   console.log(checkedImagestoDelete)
    // }

    // const deleteImages = async (values) => {
    //   const { id } = values;

    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer: ${userContext.token}` 
    //     }
    //   };
      
    //   await axios.delete(`/hotels/${id}/deletephotos`, checkedImagestoDelete, config)
    //   .then(()=> {
    //     alert('It worked')})
    // .catch(()=> {
    //     alert('Error!!!')})
    // }
    
    return(
      // <form
      // encType='multipart/form-data'
      // noValidate
      // onSubmit={formik.handleSubmit}>
            <Box 
            component='form'
            noValidate
            onSubmit={formik.handleSubmit}
             className={classes.main}>
                <Typography className={classes.sloganText}>Update Your Property!</Typography>
                <TextField sx={{mt: 3, width: '95%'}}
                    label='Change Hotel Name' 
                    name='title'              
                    value={formik.values.title} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField sx={{mt:3, width: '95%'}}
                    label='Change Location' 
                    name='location' 
                    value={formik.values.location} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                />
                <TextField sx={{mt:3, width:'95%'}}
                    label='Edit Description'  
                    multiline 
                    name='description' 
                    fullWidth
                    value={formik.values.description} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField sx={{mt:3}}
                    label='Change Price'  
                    name='price' 
                    value={formik.values.price} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                 {/* <Typography className={classes.sloganText}>Select Photos you want to delete!</Typography>
                 <Box 
                 sx={{flexGrow: 1,
                marginTop: '40px',
                marginBottom: '40px',
                padding: '10px' }}>
                    <Grid container spacing={2}>
                      {images?.map((i, index) => (
                        <Grid key={i._id} item md={6} lg={4}>
                          
                          <CardMedia component="img"
                            alt="hotel photos"
                            image={i.url}
                            key={i._id}
                            sx={{
                              height: 150,
                              display: 'flex',
                              maxWidth: 600,
                              overflow: 'hidden',
                              width: '100%',
                              aspectRatio: '1/1'
                            }}
                            />
                                <Checkbox onChange={handleCheckBoxchange} value={i.filename} icon={<DeleteOutlinedIcon/>}/>
                    
                        </Grid>))}
                    </Grid>
                    <Button
                    variant='contained'
                    onClick={deleteImages}
                    >Delete Photos!</Button>
                 </Box>

               <input 
                  type='file'
                  name='images'
                  accept='image/*'
                  multiple
                  onChange={(e) => formik.setFieldValue('images', Array.from(e.target.files))}/> */}
                  
              <Button sx={{mt:5, mb: 5, width:'90%'}} variant='contained' type='submit'>Update!</Button>
            </Box>
      // </form>
            
    )
}

export default withStyles(styles)(EditHotelForm);

