import React, {useState, useContext} from 'react';
import { motion } from 'framer-motion';
import axiosRender from '../../utils/axios';
import { useNavigate } from 'react-router-dom';


import { UserContext } from '../../context/UserContext';
import  Loader from  './Loader';
import './Dashboard.css';
import UserDashboard from './UserDashboard';
import UserPhoto from './UserPhoto';
import UserWelcome from './UserWelcome';

const Dashboard = () => {

  const [showProfile, setShowProfile] = useState(false);
  const [showHotels, setshowHotels] = useState(false);

  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();

  const handleShowProfile = () => { 
      setShowProfile(true);
      setshowHotels(false); 

  };

  const handleShowHotels = () => {
    setshowHotels(true);
    setShowProfile(false);
  };

  const logout = () => {

    const config = {

      headers: {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${userContext.token}`,
        // "Cookie": 'refreshToken'
      },
      withCredentials: true
    };

    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));


    axiosRender.get('/api/auth/logout', { refreshToken }, config,)
    .then(async response => {
      setUserContext(oldValues => {
        return { ...oldValues, token: null, details: {} }
      });

      localStorage.removeItem('refreshToken');
      
      window.localStorage.setItem("logout", Date.now())
      navigate('/login')
    })
  }

 

  

  return (

    userContext.details ===  null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : (
   <div className='main'>
    <div className="dashboard-wrapper">
              
        <div className="dashboard-container">
            <div className='dashboard-container-menu'>
              <div className='button-container'>
                  <button 
                    type='button'
                    className={showProfile ? 'active' : ''}
                    onClick={handleShowProfile}
                  >
                    Profile
                  </button>
                  <button 
                    type='button'
                    onClick={handleShowHotels}
                    className={showHotels ? 'active' : ''}
                  >
                    My Hotels
                  </button>
                  <button type='button' onClick={logout}>LogOut</button>
              </div>
            </div>
            <div className='dashboard-container-item'>
              {showProfile && 
              <motion.div 
                className='userPhoto-container'
                animate={{y: [100, 0], opacity:[0, 1]}}
                transition={{duration: 0.5, type:'tween'}}
                >
                <UserPhoto/>
              </motion.div>
              }
              {showHotels && 
              <motion.div 
                className='userDashboard-container'
                animate={{y: [100, 0], opacity:[0, 1]}}
                transition={{ duration: 0.5, type: 'ease-in-out', delayChildren: 0.5 }}
              >
                <UserDashboard/>
              </motion.div>}
              {!showHotels && !showProfile && <UserWelcome />}
            </div>
        </div>    
    </div>
  </div>)
  )
}

export default Dashboard;