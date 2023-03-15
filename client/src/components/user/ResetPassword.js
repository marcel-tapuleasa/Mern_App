import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosRender from "../../utils/axios";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

import "./ResetPassword.css";

const ResetPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
 

  let {resetToken} = useParams();
  let navigate = useNavigate();

  const closeResetPassword = () => {
    navigate('/login');
  }

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    
      const resetPromise = axiosRender.put(
        `/api/auth/resetpassword/${resetToken}`,
        {
          password,
        },
        config
      );


    await toast.promise(resetPromise, {
      pending: {
       render: 'Updating Password...',
       // disable the delay for pending state
       delay: undefined
      },
      success: {render:'Password succesfully updated!', delay: 2000},
      error: 'Something went wrong.',
    }, {
    delay: 500
    });
      setPassword("");
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }


  return (
    <Box className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
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
                  onClick={closeResetPassword}
                  sx={{
                    position: 'relative',
                    right: 8,
                    top: 8,
                   
                  }}>
                  <CloseIcon  sx={{margin: '5%', color:'#F44336', fontSize:'1rem'}}/>
                </IconButton> 
              </Tooltip>
              </div>
        <Typography variant='h6' sx={{textAlign:'center', marginBottom: '1rem', color:'#546E7A'}}>Update Password</Typography>
        
        <Box>
          <TextField
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{width: '100%', marginY:'5%'}}
          />
          {/* <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
        </Box>
        <Button type="submit">
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;