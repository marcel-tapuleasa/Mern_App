import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import NewHotelForm from './NewHotelForm';
import HotelList from './HotelList';
import Hotel from './Hotel';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route 
        exact path='/hotels/:id'
        render ={routeProps => <Hotel {...routeProps}/>}/>
        <Route
        exact path='/hotels'
        render = {routeProps => <HotelList {...routeProps}/>}/>
        <Route
        exact path='/new'
        render = {routeProps => <NewHotelForm {...routeProps}/>}/>
      </Switch>

    </div>
  );
}

export default App;
