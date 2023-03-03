import React, { useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { withStyles } from "@mui/styles";
import { UserContext } from '../../context/UserContext';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ComputerIcon from '@mui/icons-material/Computer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';




import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import Tooltip , {tooltipClasses} from '@mui/material/Tooltip';

import { toast, Zoom } from 'react-toastify';



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


const styles = {
    main: {
        // flexGrow: 1,
        // margin: '7% auto',
        // padding: '2px',
        // width: '55%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(6, 122, 184)',
        borderRadius: 3,
        backgroundColor: 'white',
        boxShadow: '5px 5px 20px -4px #EACDF2',
      },
    sloganText: {
        padding: '30px',
        color: '#3C4257',
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
    const[file, setFile] = useState([]);

    const {title, location, description, price, id, classes, author, images, toggle} = props;



    let navigate = useNavigate();

    const theme = useTheme();

    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
   
   
   const fileObj = [];
   const fileArray = [];
  
    const previewMultipleFiles = (e) => { 

    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]))
    }
    setFile(fileArray);
    toast.info(`${fileArray.length} ${fileArray.length === 1 ? 'photo' : 'photos'} selected. Click Upload to update gallery!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
      theme: "light",
    })
  }
   




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

          
        const promise = axios.put(`/hotels/${id}/addphotos`, formData, config);
           
           
        toast.promise(promise, {
          pending: {
           render: 'Saving photos...',
           // disable the delay for pending state
           delay: undefined
          },
          success: {render: 'Gallery updated successfully!', delay: 100},
          error: 'Something went wrong.',
        }, {
        delay: 500
        });
        setFile([]);
        setTimeout(() => {toggle()}, 2000 );
         


        // axios.put(`/hotels/${id}/addphotos`, formData, config)
        // .then(()=> {
        //     alert('Photo Gallery successfully updated')
        //   })
        // .catch(()=> {
        //     alert('Something went wrong!')})
            
        //     setFile([]);
        //     setTimeout(() => {toggle()}, 2000 );

            // navigate('/hotels')
    };


    
    const deleteImages = async (e) => {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer: ${userContext.token}` 
        }
      };

     const promise = axios.put(`/hotels/${id}/deletephotos`, {deleteImages: checkedImagestoDelete}, config,  )
      
     await toast.promise(promise, {
      pending: {
       render: 'Deleting selected photos...',
       // disable the delay for pending state
       delay: undefined
      },
      success: {render:`${checkedImagestoDelete.length} photos successfully deleted.`, delay: 100},
      error: 'Data saving error.',
    }, {
    delay: 500
    });
      
        setCheckedImagestoDelete('');
        setTimeout(() => {toggle()}, 2000 );
      
    //   await axios.put(`/hotels/${id}/deletephotos`, {deleteImages: checkedImagestoDelete}, config,  )
    //   .then(()=> {
    //     alert('It worked')})
    // .catch(()=> {
    //     alert('Error!!!')})
    //     setCheckedImagestoDelete('');
    //     toggle();
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
        // console.log(checkedImagestoDelete)
      }

    return(

        <Box className={classes.main} sx={{
          width: {sm: '90%', md: '80%', lg: '60%', xl: '50%' },
          margin: {xs: '5rem auto', sm: '7rem auto', lg: '12rem auto', xl:'12rem auto'}
        }}>
           <div style={{display:'flex', flexDirection:'column', alignItems: 'flex-end', width: '100%'}}>
              <Tooltip title='Close'> 
                <IconButton
                  aria-label="close"
                  onClick={toggle}
                  sx={{
                    position: 'relative',
                    right: 8,
                    top: 8,
                   
                  }}>
                  <CloseIcon  sx={{margin: '10%', color:'#F44336', fontSize:'2rem'}}/>
                </IconButton> 
              </Tooltip>
              </div> 
              
             
            <form
            encType="multipart/form-data"
            noValidate
            onSubmit={formik.handleSubmit}
            style={{width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
             
                <Typography className={classes.sloganText} >Add Photos to Gallery!</Typography>
                
                {file.length > 0 ? 

                (<ImageList sx={{paddingX: '2%', overFlow: 'hidden' }} cols={ matchDownSm ? 1 : 3} rowHeight={164}>
                    {file.map(url => 
                        <ImageListItem
                        sx={{opacity: 0.4}} key={url}>
                          <img
                            src={url}
                            srcSet={url}
                            alt='...'
                            loading="lazy"
                            style={{
                              height: 250,
                              display: 'flex',
                              maxWidth: 600,
                              overflow: 'hidden',
                              width: '100%',
                              aspectRatio: '1/1', 
                              objectFit: 'contain'
                            }}
                          />
                        </ImageListItem>
                    )}
                </ImageList>) : null}

                <Stack direction="row" alignItems="center" spacing={2} sx={{margin: '5% auto'}}>
                <Button sx={{borderRadius:'5%'}} size='small' variant="outlined" component="label" endIcon={<ComputerIcon/>} onChange={previewMultipleFiles}>
                    Choose Images
                    <input 
                      hidden 
                      accept="image/*" 
                      multiple type="file"
                      name="images"
                      onChange={(e) => formik.setFieldValue('images', Array.from(e.target.files))} />
                </Button>
                
               {file.length > 0 && <Button variant="contained" color='success' endIcon={<FileUploadIcon/>} size='small' sx={{borderRadius:'5%'}} type="submit">Upload </Button>}
                </Stack>
                <Divider variant='middle'/>
                
           </form>
            
            
            
            <Typography className={classes.sloganText}>Select Photos to delete!</Typography>

          
            <form
            onSubmit={deleteImages}
            >
            {checkedImagestoDelete.length > 0 && (
            <LightTooltip title='Delete Selection'>
              <Button 
              variant="contained" 
              size='small' 
              sx={{margin: '7% auto', display:'flex', width:'30%'}} 
              color='warning' 
              type="submit"
              endIcon={<CollectionsOutlinedIcon/>}>
                Delete
              </Button>
            </LightTooltip>)}
            <ImageList 
            sx={{ marginBottom: '60px', overflowX:'auto' }} 
            cols={matchDownSm ? 1 : (matchDownMd ? 2 : 3)} >
                {images?.map((i, index) => (
                 <ImageListItem 
                 key={index} 
                 loading='lazy'
                 sx={{ '&:hover': {
                  opacity: '0.6'
                 }}}>
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
                              height: 250,
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
 {/* {checkedImagestoDelete.length > 0 && 
  <Button variant="contained" color="warning" type="submit">Delete</Button>} */}
  </form>
        </Box>
    )
}

export default withStyles(styles)(ManagePhotos);