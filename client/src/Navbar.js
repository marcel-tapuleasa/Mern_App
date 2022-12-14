import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}));




// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userContext, setUserContext] = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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



  return (
    <>
    <AppBar  sx={{mb: '20px',
                 backgroundColor: 'rgba(255,255,255,0.8)', 
                 boxShadow:'none', 
                 backdropFilter:'blur(8px)', 
                 zIndex:'1100',
                 borderStyle: 'solid',
                 borderWidth: 0,
                 borderButtom: 'thin',
                 borderColor: '#E7EBF0',
                 color: '#2D3843'
                }} 
                 position='fixed' >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color='black'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            HotelZone
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem component={Link} to='/'
                onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home </Typography>
                </MenuItem>
                <MenuItem component={Link} to='/hotels'
                onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    Hotels</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/new'
                onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    Add Hotel</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Hotels
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'flex-start', my: 1, mx: '3rem' }}>
            <LightTooltip title='Homepage'>
              <Button
                href='/'
                onClick={handleCloseNavMenu}
                sx={{ my: 1.5, color: 'white', display: 'block' }}
              >
                <HomeIcon sx={{ color: '#E91E63'}}/>
              </Button>
            </LightTooltip>
              <Button
                href='/hotels'
                onClick={handleCloseNavMenu}
                startIcon={<HotelIcon/>}
                sx={{ p: '2', 
                      display: 'inline-flex', 
                      color: 'black', 
                      textTransform: 'capitalize',
                      marginLeft: '5%'}}
              >
                Hotels
              </Button>
              <Button
                href='/new'
                onClick={handleCloseNavMenu}
                startIcon={<AddCircleOutlinedIcon/>}
                sx={{ 
                  p:'2', 
                  color: 'black', 
                  display: 'inline-flex', 
                  textTransform:'capitalize',
                  marginLeft:'2%'
                 }}
              >
                Add Hotel
              </Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip arrow title={userContext.token ? 'View Account' : 'Login'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                src=
                {userContext.details && userContext.details.avatarImage ? userContext.details.avatarImage.url : 
                  '' }
                sx={{ width: 56, height: 56, border: '2px solid #F06292', boxShadow: '3px 3px 5px -3px #BDBDBD' }}/>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClick={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
             {userContext.token && userContext.token !==null && userContext.details  ?
               <div>
               <Link  underline='none' to={`/aboutme/${userContext.details._id}`}><MenuItem>Profile</MenuItem></Link>
              <MenuItem onClick={logout}>Logout</MenuItem>
              </div> 
              :
              <Link to='/login'><MenuItem>Login</MenuItem></Link>}
            
             
              
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
  </>)
};

export default Navbar;

