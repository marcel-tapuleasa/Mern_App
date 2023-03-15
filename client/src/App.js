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
import axiosRender from './utils/axios';
import ResetPassword from './components/user/ResetPassword';
import Dashboard from './components/user/Dashboard';

const NewHotelForm = lazy(() => import('./components/hotel/NewHotelForm'));


function App() {
  const [userContext, setUserContext] = useContext(UserContext);


  const fetchUserDetails = useCallback(async () => {
    const config = {
      headers: {
          // "Content-Type": "application/json",
           "Authorization": `Bearer ${userContext.token}`,
          //  "Cookie": 'refreshToken'
        },
      withCredentials: true  
  }

    const res = await axiosRender.get('/api/users/me', null, config);
            setUserContext(oldValues => {
                return { ...oldValues, details: res.data };
            });
           

}, [setUserContext, userContext.token]);

  useEffect(() => {
    console.log('useEffect for Profile!!!')
    // fetch only when user details are not present
        if(!userContext.token || userContext.token === null) return;                   
        if (!userContext.details) {
             fetchUserDetails();
             return () => {
              
            }
        }
        
  }, [userContext.details, fetchUserDetails, userContext.token]);

  // ==============================================


  const verifyUser = useCallback(async () => {

    // if(!userContext.token || userContext.token === null) {return;};

    const config = {
      headers: {
          // "Content-Type": "application/json",
           "Authorization": `Bearer ${userContext.token}`,
          //  "Cookie": 'refreshToken'
        },
      withCredentials: true  
  }

  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
     
     const res = await axiosRender.post('/api/auth/refreshtoken', { refreshToken }, config);

     if(res.statusText === 'OK') {
       setUserContext(oldValues => {
         return{...oldValues, token: res.data.token}
       });

       localStorage.setItem('refreshtoken', JSON.stringify(res.data.newRefreshToken))

     } else {
       setUserContext(oldValues => {
         return{...oldValues, token: null}
       })
     }
      // call refreshToken every 10 minutes to renew the authentication token.
      setTimeout(verifyUser, 10 * 60 * 1000)
  },[setUserContext]);

  useEffect(() => {
    // if(!userContext.token || userContext.token === null) return;
    verifyUser();

    console.log('Inside UseEffect for verifyUser!!!');

    return () => {
              
    }
 
  }, [verifyUser, userContext.token]);

// ==============================================

 



  return (
    <div >
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
            path='hotels/search'
            element = { <HotelList/> }></Route>                
          <Route 
            path='hotels/:id'
            element ={<HotelDetails/>}></Route> 
          <Route
            path='/new'
            element = {userContext.token ? <NewHotelForm/> : <SignIn/>}></Route>   
          <Route
            path='/aboutme/:id'
            element = {userContext.token ? <Dashboard/> : <SignIn/>}></Route>
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
          title="Made by"
          description="Something here to give the footer a purpose!"
      /> */}
    </div>
  );
}

export default App;
