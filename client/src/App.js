import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NewHotelForm from './NewHotelForm';
import HotelList from './HotelList';
import HotelDetails from './HotelDetails';
import Navbar from './Navbar';
import Footer from './Footer';
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      <Container maxWidth='xl'>
        <Navbar/>
        <Routes>
          <Route
            path='/new'
            element = {<NewHotelForm/>}></Route>
          <Route
            path='hotels'
            element = { <HotelList/> }></Route>
          <Route 
            path='hotels/:id'
            element ={<HotelDetails/>}></Route>

        </Routes>
        {/* <Footer
          title="Made By"
          description="Something here to give the footer a purpose!"
      /> */}
      </Container>
    </div>
  );
}

export default App;
