import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import footerLogo from './assets/footerLogo.png';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/tapuleasa-marcel-6065a3139/">
        Marcel Tapuleasa a.k.a Macecea
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer(props) {
  const { description, title } = props;

  return (
    <Box component="footer" sx={{ bgcolor: '#ECEFF1', py:3, marginTop:'auto', width:'100%', zIndex:'1000', position:'absolute'}}>
      <Container>
        <Box sx={{display:'flex', justifyContent:'center'}}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Box
          component='img'
          src={footerLogo}
          sx={{height:'25px', marginTop:'4px', marginLeft:'6px'}}/>
        </Box>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;