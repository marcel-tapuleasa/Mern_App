import React, {useContext, useState} from 'react';
import {Typography, Box, Card, CardMedia, Button, ButtonGroup, CardActions} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {toast} from 'react-toastify';


import axios from 'axios';

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
            credentials: "include",
            headers: {
              "Authorization": `Bearer: ${userContext.token}`
            }
        }

        const res = axios.put(`/api/auth/useravatarimage/${userContext.details._id}`, formData, config );

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
                sx={{width: {xs: '100%', sm: '100%', md:'90%'}, borderRadius: {xs: '2%', sm: '3%', md:'5%'}}}>
                <form
                    encType='multipart/form-data' 
                    onSubmit={handleSubmitFile}
                    
                >
                   
                    <Card 
                        sx={{
                            borderRadius:{xs: '2%', sm: '3%', md:'5%'},
                            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)', 
                            background: 'linear-gradient(134.87deg, #fff -20%, whitesmoke  109.89%)',
                            
                        }}> 
                        
                        <Typography sx={{textAlign: 'center', marginY: '15px', fontSize:{xs: '1rem', sm: '1.2rem', md: '1.2rem'}, fontWeight:'600', color: '#0277BD'}} variant="h6">Update your profile Photo!</Typography>
                    
                     {previewSource ? 
                                <img
                                    src={previewSource}
                                    alt="chosen"
                                    style={{ height: '300px', width: '90%', marginLeft: '5%', loading: 'lazy', overflow:'hidden', aspectRatio:'1/1'}}
                                /> : (
                        userContext.details.avatarImage ? 
                        <CardMedia
                            component="img"
                            alt="user avatar photo"
                            image={userContext.details.avatarImage.url}
                            height='80%'
                            sx={{ loading: 'lazy', overflow:'hidden', aspectRatio:'1/1'}}
                        /> :  
                          
                            <AccountCircleIcon sx={{fontSize: '300px'}}/>)}
                        <CardActions>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{margin: '3% auto'}}>
                                <LightTooltip title='Chose Photo'>
                                <Button
                                    component='label'
                                    variant='outlined' 
                                    color='info'
                                >{userContext.details.avatarImage ? "Change Photo" : "Upload Photo"}
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