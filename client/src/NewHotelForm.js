import React, {useState} from 'react';
import axios from 'axios';

function NewHotelForm () {

const [title, setTitle] = useState('');
const [location, setLocation] = useState('');

const addHotel = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addhotel', {title: title, location: location})
    .then(()=> {
        alert('It worked')})
    .catch(()=> {
        alert('Error!!!')})
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