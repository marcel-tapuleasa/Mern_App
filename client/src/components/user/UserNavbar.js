import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography  from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import {UserContext} from '../../context/UserContext';
import axios from 'axios';





function UserNavbar () {

    const [userContext, setUserContext] = useContext(UserContext);

    const navigate = useNavigate();

    const logout = () => {


        const config = {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userContext.token}`
          }
        };
    
        axios.get('/api/auth/logout', config)
        .then(async response => {
          setUserContext(oldValues => {
            return { ...oldValues, token: null, details: {} }
          })
          window.localStorage.setItem("logout", Date.now());
          navigate('/login')
        })
      };    


    return(
        <Box sx={{
            backgroundColor:'white',
            borderRadius: '2%', 
            height: '200px', 
            width: '100%',
            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)' }}>
            <Typography variant='h5' sx={{
                textAlign: 'center', 
                fontSize:'1.2rem', 
                fontWeight:'900', 
                letterSpacing:'2px',
                marginTop:{xs:'10%', sm:'3%'}, 
                color: '#4264fb'}}>Quick Action Panel
            </Typography>

         <Stack direction='row' sx={{
                        width: '50%', 
                        margin: {xs:'8% auto', sm:'7% auto'}, 
                        justifyContent: 'space-around',
                        boxShadow: '0 0 3px 1px rgb(31 51 73 / 10%)' 
                        
                        }}>
                <Tooltip title='Add Hotel'>
                    <IconButton>
                        <Link href='/new'>
                        <AddCircleOutlineIcon sx={{fontSize: '30px', color: '#42A5F5'}}/></Link>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Search Hotels'>
                    <IconButton>
                        <Link href='/hotels'>
                        <SearchIcon sx={{fontSize:'30px', color:'#FFC107'}}/></Link>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Logout'>
                    <IconButton onClick={logout}>
                        <LogoutIcon sx={{fontSize:'30px', color:'#546E7A'}}/>
                    </IconButton>
                </Tooltip>    
        </Stack>   
        </Box>
    )
}

export default UserNavbar