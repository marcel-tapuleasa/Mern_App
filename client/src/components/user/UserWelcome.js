import React, {useContext} from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';

import  Loader from  './Loader';
import { UserContext } from '../../context/UserContext';



function UserWelcome () {
    const [userContext, setUserContext] = useContext(UserContext);

    return  userContext.details ===  null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : 

    <>
    <motion.div 
        style={{ 
            borderRadius: '8px', 
            height: '500px', 
            backgroundColor: 'white', 
            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)',
            display: 'flex', 
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center'
            }}
        animate={{opacity: [0, 1], scale: [0, 1]}}
        transition={{duration: 2, type: 'ease-in-out', delayChildren: 0.5}}    
            >
        <span style={{fontSize: '2.5rem'}}>👋</span>
        <Typography 
            variant='h5' 
            sx={{
                textAlign: 'center', 
                color:'black', 
                fontSize:'1.2rem', 
                fontWeight:'900', 
                letterSpacing:{xs: '1px', md: '2px'},
                textTransform: 'capitalize',
                marginTop: '1rem'
            }}>
            Welcome, {userContext.details.username}!
        </Typography>
    </motion.div>
    </>
}

export default UserWelcome;