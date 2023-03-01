import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Nav from './Nav';
import { UserContext } from './context/UserContext';
import './Home.css';
import hello01 from './assets/hello01.jpg'

function Home() {

    const [userContext, setUserContext]  = useContext(UserContext);

    const navigate = useNavigate();

    const viewHotels = () => {
        navigate('/hotels');
    }

    const registerUser = () => {
        navigate('/register');
    }

    return (
    <div className='home-wrapper'>
        
        <motion.div 
            animate={{y: [100, 0], opacity: [0, 1]}}
            transition={{duration: 1, type: 'ease-in-out'}}
            className='home-welcome-container'
        >
            <div className='home-maintext-container'>
                <h4>PLAN A TRIP?</h4>
            </div>
            <motion.div
                animate={{opacity: [0, 1], x: [100, 0]}}
                transition={{duration: 1, delay: 0.5, type: 'ease-in-out'}}
                className='home-second-animation'
            >
                <div className='home-secondtext-container'>
                    <p>Make your choice based on your fellow travellers' trusted reviews!</p>
                    <p>Over <span>2000</span> hotels available, more than <span>100k</span> reviews...</p>
                    <p>Planning your trip is so easy...</p>
                </div>
                <div className='home-buttons-container'>
                    <button type='button' onClick={viewHotels}>View Hotels</button>
                    {!userContext?.token && <button type='button' onClick={registerUser}>Register</button>}
                </div>
            </motion.div>
        </motion.div>
        <div className='hello-image-container'>
            <img src={hello01} alt='hello-msg'/>
        </div>
        <div className='home-nav-bottom'>
            <Nav />
        </div>
       
    </div>
    ) 
}

export default Home;

