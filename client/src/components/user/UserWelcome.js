import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmojiPeople from '@mui/icons-material/EmojiPeople';
import  Loader from  './Loader';



function UserWelcome () {
    const [userContext, setUserContext] = useContext(UserContext);

    return  userContext.details ===  null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : 

    <>
    <Box 
        sx={{ 
            width: '100%', 
            borderRadius: '2%', 
            height: '200px', 
            background: 'linear-gradient(134.87deg, #52e5e7 -20%, #130cb7 109.89%)', 
            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)',
            display: 'flex', 
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center'
            }}>
        <EmojiPeople sx={{color:'white', marginBottom: '5%', fontSize:'4rem'}}/>
        <Typography variant='h5' sx={{
            textAlign: 'center', 
            color:'white', 
            fontSize:'1.2rem', 
            fontWeight:'900', 
            letterSpacing:{xs: '1px', md: '2px'}}}>
            Welcome, {userContext.details.username}!
        </Typography>
    </Box>
    </>
}

export default UserWelcome;