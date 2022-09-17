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
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Stack from '@mui/material/Stack';


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const styles = {
    main: {
        flexGrow: 1,
        margin: '7% auto',
        padding: '2px',
        width: '55%',
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
    
      }};


      const validationSchema = yup.object({
        images: yup.mixed()
      });




function ManagePhotos(props) {
    const[userContext, setUserContext] = useContext(UserContext);
    const[checkedImagestoDelete, setCheckedImagestoDelete] = useState([]);

    const {title, location, description, price, id, classes, author, images} = props;

    let navigate = useNavigate();

    
    const addPhotos = (values) => {

        const formData = new FormData();

        values.images.forEach((image, index) => {formData.append('images', values.images[index])});
        formData.append('title', title);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('price', price);
           

        const config = {
            headers: {
              "Content-Type": 'multiform/form-data',
              "Authorization": `Bearer: ${userContext.token}`
            }
            
          }


        axios.put(`/hotels/${id}/addphotos`, formData, config)
        .then(()=> {
            alert('It worked')})
        .catch(()=> {
            alert('Error!!!')})
            navigate('/hotels')
    };


    
    const deleteImages = async (e) => {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer: ${userContext.token}` 
        }
      };
      
      await axios.put(`/hotels/${id}/deletephotos`, {deleteImages: checkedImagestoDelete}, config,  )
      .then(()=> {
        alert('It worked')})
    .catch(()=> {
        alert('Error!!!')})
        setCheckedImagestoDelete('');
        // navigate('/hotels')
    }



    const formik = useFormik({
        initialValues: {title: title, location: location, description: description, price: price, id: id, images: images, },
        validateOnBlur: true,
        validationSchema: validationSchema,
        onSubmit: addPhotos
    }); 




    const handleCheckBoxchange = (event) => {
        let updatedList = [...checkedImagestoDelete];
        if (event.target.checked) {
          updatedList = [...checkedImagestoDelete, event.target.value];
        } else {
          updatedList.splice(checkedImagestoDelete.indexOf(event.target.value), 1);
        }
        setCheckedImagestoDelete(updatedList);
        console.log(checkedImagestoDelete)
      }

    return(

        <Box className={classes.main}>
            <form
            encType="multipart/form-data"
            noValidate
            onSubmit={formik.handleSubmit}>
                <Typography className={classes.sloganText} >Add Photos to Gallery!</Typography>
                <Stack direction="row" alignItems="center" spacing={2} sx={{marginLeft: '25px'}}>
                <Button variant="contained" component="label" endIcon={<FileUploadIcon/>}>
                    Upload
                    <input 
                      hidden 
                      accept="image/*" 
                      multiple type="file"
                      name="images"
                      onChange={(e) => formik.setFieldValue('images', Array.from(e.target.files))} />
                </Button>
                <Button variant="contained" color="success" type="submit">Save Photos</Button>
                </Stack>
            </form>

            
            <Typography className={classes.sloganText}>Select Photos to delete!</Typography>

            {/* <Grid container spacing={2} >
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
                    </Grid> */}
            <form
            onSubmit={deleteImages}>
            <ImageList sx={{ width: 700, height: 450 }} cols={3} rowHeight={180}>
                {images?.map((i, index) => (
                 <ImageListItem key={index}>
                    {/* <img
                        src={`${i.url}?w=150&h=150&fit=crop&auto=format`}
                        srcSet={`${i.url}?w=150&h=150&fit=crop&auto=format&dpr=2 2x`}
                        alt={i.filename}
                        loading="lazy"
                    />   */}
                    <CardMedia component="img"
                            alt="hotel photos"
                            image={i.url}
                            key={i._id}
                            sx={{
                              height: 200,
                              display: 'flex',
                              maxWidth: 600,
                              overflow: 'hidden',
                              width: '100%',
                              aspectRatio: '1/1'
                            }}/>
<Checkbox onChange={handleCheckBoxchange} name="deleteImages[]" value={i.filename} icon={<DeleteOutlinedIcon/>}/>
{/* <Checkbox component='label' icon={<DeleteOutlinedIcon/>}>
  <input
    hidden
    type='checkbox'
    onChange={handleCheckBoxchange} 
    name="deleteImages[]" 
    value={i.filename}/>
</Checkbox> */}

        </ImageListItem>
      
      ))}
    </ImageList>
 {checkedImagestoDelete.length > 0 && 
  <Button variant="contained" color="warning" type="submit">Delete</Button>}</form>
        </Box>
    )
}

export default withStyles(styles)(ManagePhotos);