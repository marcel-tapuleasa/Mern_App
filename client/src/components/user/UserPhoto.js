import React, {useContext, useState} from 'react';
import {Typography, Box, Card, CardMedia, Button, CardActions} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {toast} from 'react-toastify';
import { motion } from 'framer-motion';


import axiosRender from '../../utils/axios';

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


function UserPhoto(props) {

    const[userContext, setUserContext] = useContext(UserContext)

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

  

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        uploadImage();
    }

    const uploadImage = async () => {

        const formData = new FormData();

        formData.append('avatarImage', selectedFile);

        const config = {
            headers: {
            //   "Content-Type": 'multiform/form-data',
              "Authorization": `Bearer ${userContext.token}`,
            },
        
            
          }

        const res = axiosRender.put(`/api/auth/useravatarimage/${userContext.details._id}`, formData, config );

        await toast.promise(res, {
            pending: {
             render: 'Saving photo',
             // disable the delay for pending state
             delay: undefined
            },
            success: {render: 'Photo updated successfully!', delay: 100},
            error: 'Something went wrong.',
          });


        setTimeout(() => {setPreviewSource(''); setSelectedFile(null)}, 1000); 
        setUserContext(oldValues => {
                return { ...oldValues, details: res.data };
            })
    }


    return(
            <Box
                sx={{ borderRadius: '8px'}}>
                <form
                    encType='multipart/form-data' 
                    onSubmit={handleSubmitFile}
                    
                >
                   
                    <Card 
                        sx={{
                            borderRadius:{xs: '2%', sm: '3%', md:'5%'},
                            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)', 
                            background: 'linear-gradient(134.87deg, #fff -20%, whitesmoke  109.89%)',
                            display:'flex',
                            flexDirection:'column'
                            
                        }}> 
                        
                        <Typography 
                            sx={{
                                textAlign: 'center', 
                                marginY: '15px', 
                                fontSize:{xs: '1rem', sm: '1.2rem', md: '1.2rem'}, 
                                fontWeight:'600', 
                                color: '#0277BD'
                            }} 
                            variant="h6">
                                Update your profile Photo!
                        </Typography>
                    
                     {previewSource ? 
                                <motion.img
                                    animate={{opacity: [0, 1]}}
                                    transition={{duration: 1, type: 'ease'}}
                                    src={previewSource}
                                    alt="chosen"
                                    style={{
                                        width: 'auto', 
                                        height: '400px', 
                                        margin: '5%', 
                                        loading: 'lazy', 
                                        overflow:'hidden', 
                                        aspectRatio:'1/1', 
                                        objectFit: 'contain'
                                    }}
                                /> : (
                        userContext.details.avatarImage ? 
                        <CardMedia
                            component="img"
                            alt="user avatar photo"
                            image={userContext.details.avatarImage.url}
                            height='400px'
                            width='400px'
                            sx={{ loading: 'lazy', overflow:'hidden', aspectRatio:'1/1', objectFit: 'contain', margin: '5% auto'}}
                        /> :  
                          
                            <AccountCircleIcon sx={{fontSize: {xs:'150px', sm: '200px', md: '300px'}, alignSelf:'center'}}/>)}
                        <CardActions>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{margin: '3% auto'}}>
                                <LightTooltip title='Chose Photo'>
                                <Button
                                    component='label'
                                    variant='outlined' 
                                    color='info'
                                >{userContext.details.avatarImage ? "Update Photo" : "Upload Photo"}
                                    <input 
                                    hidden
                                    type='file'
                                    accept='image/*'
                                    name='avatarImage'
                                    value={fileInputState}
                                    onChange={handleFileInputChange}/>
                                </Button></LightTooltip>
                            { selectedFile !== null  && <Button variant='contained' type='submit' color='success' sx={{width: 'fit-content'}}>Save</Button>}
                            </Stack>
                        </CardActions>        
                    </Card>
                    
            </form>
            </Box>

    )
}

export default UserPhoto;