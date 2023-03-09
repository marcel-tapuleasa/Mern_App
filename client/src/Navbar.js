import * as React from 'react';
import {useNavigate} from 'react-router-dom';
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
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import logo from './assets/logo7.png';

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




const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});



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

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userContext.token}`,
        "Cookie": 'refreshToken'
      },
      withCredentials: true
    };

    axios.get('https://hoteltips.onrender.com/api/auth/logout', config,)
    .then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, token: null, details: {} }
      })
      window.localStorage.setItem("logout", Date.now())
      navigate('/login')
    })
  }



  return (
    <>
    <ThemeProvider theme={theme}>
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
          <Box
          component='img'
          src={logo}
          sx={{height:'40px', width:'150px', display:{xs: 'none', sm: 'none', md:'flex'}}}/>
          

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
              
                <MenuItem component={Link} href='/'
                onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home </Typography>
                </MenuItem>
                <MenuItem component={Link} href='/hotels'
                onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    Hotels</Typography>
                </MenuItem>
                <MenuItem component={Link} href='/new'
                onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    Add Hotel</Typography>
                </MenuItem>
              
            </Menu>
             <Box
            component='img'
            src={logo}
            sx={{
                height:'30px', 
                width:'100px', 
                margin: '2% auto 0'
                // display:{xs: 'flex', sm: 'flex', md:'none'},
          
              }}
                />
          </Box>
         
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent:'flex-end', 
            my: 1, 
            mx: '3rem',
             }}>
              <Stack direction='row' justifyContent='space-between' sx={{width:{md: '50%', lg:'40%', xl: '30%'}, marginRight:{md:'1em', lg:'3em'}}}>
            <LightTooltip title='Homepage'>
              <Button
                disableRipple={true}
                href='/'
                onClick={handleCloseNavMenu}
                sx={{ my: 1.5, display: 'block', '&:hover': {backgroundColor: 'transparent' } }}
              >
                <HomeIcon sx={{ color: '#040645', '&:hover': {color: '#9fa0b5', marginTop: '1.5px'}}}/>
              </Button>
            </LightTooltip>
              <Button
                href='/hotels'
                onClick={handleCloseNavMenu}
                // startIcon={<HotelIcon/>}
                disableRipple={true}
                
                sx={{ p: '2', 
                      display: 'inline-flex', 
                      color: 'black', 
                      textTransform: 'capitalize',
                      marginLeft: '5%',
                      backgroundImage: 'linear-gradient(transparent calc(100% - 1px), rgb(0, 0, 0) 1px), linear-gradient(transparent calc(100% - 1px), rgb(229, 229, 229) 1px)',
                      backgroundSize: '0% 6px, 100% 6px',
                      backgroundPosition: '0px calc(100% - 1px), 0px calc(100% - 1px)',
                      transition: 'all 400ms cubic-bezier(0.2, 0.8, 0.4, 1) 0s',
                      backgroundRepeat: 'no-repeat',
                    '&:hover': {backgroundSize: '100% 6px, 100% 6px', backgroundColor:'transparent', color: '#9fa0b5'}
                    }}
              >
                Hotels
              </Button>
              <Button
                href='/new'
                onClick={handleCloseNavMenu}
                // startIcon={<AddCircleOutlinedIcon/>}
                sx={{ 
                  p:'2', 
                  color: 'black', 
                  display: 'inline-flex', 
                  textTransform:'capitalize',
                  marginLeft:'2%',
                  backgroundImage: 'linear-gradient(transparent calc(100% - 1px), rgb(0, 0, 0) 1px), linear-gradient(transparent calc(100% - 1px), rgb(229, 229, 229) 1px)',
                  backgroundSize: '0% 6px, 100% 6px',
                  backgroundPosition: '0px calc(100% - 1px), 0px calc(100% - 1px)',
                  transition: 'all 400ms cubic-bezier(0.2, 0.8, 0.4, 1) 0s',
                  backgroundRepeat: 'no-repeat',
                 '&:hover': {backgroundSize: '100% 6px, 100% 6px', backgroundColor:'transparent', color: '#9fa0b5'}
                 }}
              >
                Add Hotel
              </Button>
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <LightTooltip arrow title={userContext.token ? 'View Account' : 'Login'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginTop:'5%'  }}>
                <Avatar 
                src=
                {userContext.details && userContext.details.avatarImage ? userContext.details.avatarImage.url : 
                  '' }
                sx={{ 
                  width: {xs:40, md: 56}, 
                  height: {xs:40, md: 56},
      
                  // border: '2px solid #F06292', 
                  // boxShadow: '3px 3px 5px -3px #BDBDBD' 
                  }}/>
              </IconButton>
            </LightTooltip>

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
               <MenuItem><Link href={`/aboutme/${userContext.details._id}`} underline="none" sx={{color:'black'}}>Profile</Link></MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
              </div> 
              :
              <MenuItem><Link href='/login' underline='none' sx={{color:'black'}}>Login</Link></MenuItem>}
            
             
              
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
    </ThemeProvider>
  </>)
};

export default Navbar;

