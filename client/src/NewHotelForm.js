import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function NewHotelForm () {

const [title, setTitle] = useState('');
const [location, setLocation] = useState('');
let navigate = useNavigate();

const addHotel = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addhotel', {title: title, location: location});
    navigate('/hotels')
    
};

return(
    <div>
        <form>
            <input
                type='text'
                name={title}
                value={title}
                placeholder='Enter Hotel Name'
                onChange={event => {setTitle(event.target.value)}}/>
             <input
                type='text'
                name={location}
                value={location}
                placeholder='Enter Location'
                onChange={event => {setLocation(event.target.value)}}/>
                <button onClick={addHotel}>Add Hotel</button>
        </form>
    </div>
)

}

export default NewHotelForm;