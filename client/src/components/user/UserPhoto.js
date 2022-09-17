import React, {useContext, useState} from 'react';
import {Grid, Typography, Box, Card, CardMedia, Button, ButtonGroup} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import axios from 'axios';


function UserPhoto(props) {

    const[userContext, setUserContext] = useContext(UserContext)

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

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

        axios.put(`/api/auth/useravatarimage/${userContext.details._id}`, formData, config )
    }


    return(
        <Grid item sm={12} md={4}>
            <Box>
                <form
                encType='multipart/form-data'
                
                onSubmit={handleSubmitFile}
                >
                    <Typography sx ={{textAlign: 'center', marginY: '15px'}} component="h2">Manage your profile Photo!</Typography>
                        <Card 
                        sx={{
                            height: 500,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center', alignItems: 'center',
                            backgroundColor: '#4386ab',
                            '&:hover': {
                            backgroundColor: '#3796b0',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}>
                            {userContext.details.avatarImage ? 
                            <CardMedia
                                component="img"
                                alt="user avatar photo"
                                image={userContext.details.avatarImage.url}
                                sx={{
                                    height: 300,
                                    display: 'block',
                                    maxWidth: 600,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}/> : ( 
                                previewSource ? 
                                    <img
                                        src={previewSource}
                                        alt="chosen"
                                        style={{ height: '300px' }}
                                    /> :
                                <AccountCircleIcon sx={{fontSize: '300px'}}/>)}
                        </Card>
                        <ButtonGroup variant='outlined' color='info' fullWidth size='small'>
                            <Button
                                component='label' 
                            >{userContext.details.avatarImage ? "Change Avatar Photo" : "Upload Avatar Photo"}
                                <input 
                                hidden
                                type='file'
                                accept='image/*'
                                name='avatarImage'
                                value={fileInputState}
                                onChange={handleFileInputChange}/>
                            </Button>
                            <Button variant='outlined' type='submit' color='success' sx={{width: 'fit-content'}}>Save</Button>
                        </ButtonGroup>
            </form>
            </Box>

    </Grid>
    )
}

export default UserPhoto;