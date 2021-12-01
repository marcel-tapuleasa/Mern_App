import React from "react";
import useInputState from './hooks/useInputState';
import axios from 'axios';

function EditHotelForm(props) {
    const [value, handleChange, reset] = useInputState(props);
    // const [valueLocation] = useInputState(props.location);


    const updateHotel = (id) => {
        axios.put(`http://localhost:5000/hotels/${id}/edit`, {_id: id, title: value.title, location: value.location})
        .then(()=> {
            alert('It worked')})
        .catch(()=> {
            alert('Error!!!')})
    };
    
    return(
        <form>
            <input name='title' value={value.title} onChange={handleChange} type='text'/>
            <input type='text' name='location' value={value.location} onChange={handleChange}/>
            <button onClick={() => updateHotel(props.id)}>Update!</button>
            
        </form>
    )
}

export default EditHotelForm;