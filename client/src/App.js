import React, {useContext, lazy, Suspense, useCallback, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import HotelList from './components/hotel/HotelList';
import HotelDetails from './components/hotel/HotelDetails';
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import ForgotPassword from './components/user/ForgotPassword';
import Navbar from './Navbar';
import Home from './Home';
import { UserContext } from './context/UserContext';
import axios from 'axios';
import ResetPassword from './components/user/ResetPassword';
import Profile from './components/user/Profile';

const NewHotelForm = lazy(() => import('./components/hotel/NewHotelForm'));

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(async () => {
     const res = await axios.post('/api/auth/refreshtoken');
     

     if(res.statusText === 'OK') {
       setUserContext(oldValues => {
         return{...oldValues, token: res.data.token}
       })
     } else {
       setUserContext(oldValues => {
         return{...oldValues, token: null}
       })
     }
    //   if (response.statusText==='OK') {
    //     setUserContext(oldValues => {
    //       return { ...oldValues, token: data.token }
    //     })
    //   } else {
    //     setUserContext(oldValues => {
    //       return { ...oldValues, token: null }
    //     })
      // }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
  },[setUserContext]);

  useEffect(() => {
    verifyUser();
    console.log('Inside UseEffect for verifyUser!!!');
    console.log(userContext.token)
 
  }, [verifyUser, userContext.token]);

// ==============================================

  const fetchUserDetails = useCallback(async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userContext.token}`,
          }
    }

    const res = await axios.get('/api/users/me', config);
            setUserContext(oldValues => {
                return { ...oldValues, details: res.data };
            })
           

}, [setUserContext, userContext.token]);

  useEffect(() => {
    console.log('useEffect for Profile!!!')
    // fetch only when user details are not present                   
        if (!userContext.details) {
             fetchUserDetails()
        }
  }, [userContext.details, fetchUserDetails])



  return (
    <div >
      {/* <Container maxWidth='xl'> */}
        <Navbar/>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>          
          <Route
          path='/'
          element = {<Home/>}></Route>
            <Route
            path='hotels'
            element = { <HotelList/> }></Route>                 
          <Route 
            path='hotels/:id'
            element ={<HotelDetails/>}></Route> 
          <Route
            path='/new'
            element = {userContext.token ? <NewHotelForm/> : <SignIn/>}></Route>  
          <Route
            path='/aboutme'
            element = {userContext.token ? <Profile/> : <SignIn/>}></Route>
          <Route
          path='/register'
          element = {<SignUp/>}></Route> 
           <Route
          path='/login'
          element = {<SignIn/>}></Route>
          <Route
          path='/forgotpassword'
          element = {<ForgotPassword/>}></Route>
          <Route
          path='/resetpassword/:resetToken'
          element = {<ResetPassword/>}></Route>

          </Routes></Suspense>
      

        
        {/* <Footer
          title="Made By"
          description="Something here to give the footer a purpose!"
      /> */}
      {/* </Container> */}
    </div>
  );
}

export default App;
