import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NewHotelForm from './NewHotelForm';
import HotelList from './HotelList';
import HotelDetails from './HotelDetails';

function App() {
  return (
    <div className="App">
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

    </div>
  );
}

export default App;
