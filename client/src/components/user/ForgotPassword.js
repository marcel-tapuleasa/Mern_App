import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import './ForgotPassword.css';
import Box from '@mui/material/Box';
import Typography  from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import {toast} from 'react-toastify';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';





const ForgotPassword = () => {
  const [email, setEmail] = useState("");


  const navigate = useNavigate();

  const closeForgetPassword = () => {
    navigate('/login')
  }

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    // try {
      const promise = axios.post(
        "https://hoteltips.onrender.com/api/auth/forgotpassword",
        { email },
        config
      );


    await toast.promise(promise, {
      pending: {
       render: 'Sending email...',
       // disable the delay for pending state
       delay: undefined
      },
      success: {render:'Recovery email sent. Check your Inbox for further details!', delay: 2000},
      error: 'Something went wrong.',
    }, {
    delay: 500
    });
      setEmail("");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  // };

  return (
    <Box className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        style={{ width: '380px',
          padding: '1.5rem',
          backgroundColor: '#fff',
          borderRadius:'2%',
          boxShadow: '2px 2px 30px 6px rgba(5, 16, 27, 0.1)'
        }}
      >
         <div style={{display:'flex', flexDirection:'column', alignItems: 'flex-end', width: '100%'}}>
              <Tooltip title='Close'> 
                <IconButton
                  aria-label="close"
                  onClick={closeForgetPassword}
                  sx={{
                    position: 'relative',
                    right: 8,
                    top: 8,
                   
                  }}>
                  <CloseIcon  sx={{margin: '5%', color:'#F44336', fontSize:'1rem'}}/>
                </IconButton> 
              </Tooltip>
              </div>
        <Typography variant='h6' sx={{textAlign:'center', marginBottom:'1rem', color:'#546E7A'}}>Forgot Password?</Typography>
        {/* {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>} */}
        <Box>
          <Typography variant='subtitle2' color='#607D8B'>
            Please enter the email address you registered your account with. We
            will send you reset password confirmation to this email!
          </Typography>
          <TextField
            variant='filled'
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{width: '100%', marginY:'5%'}}/>
          {/* <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
        </Box>
        <Button type="submit">
          Send Email
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPassword;