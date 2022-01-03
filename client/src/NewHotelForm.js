import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function NewHotelForm () {

const [title, setTitle] = useState('');
const [location, setLocation] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
let navigate = useNavigate();

const addHotel = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addhotel', {title: title, location: location, description: description, price: price});
    navigate('/hotels')
    
};

return(
    <div>
            <Box
            component='form'
            sx={{ width: '50%', display: 'flex', flexWrap: 'wrap', mt: 2, flexDirection:'column'}}
            >
                <div>
            <TextField
                fullWidth
                label='Hotel Name'
                name={title}
                value={title}
                placeholder='Enter Hotel Name'
                onChange={event => {setTitle(event.target.value)}}/>
                </div>
             <div>
             <TextField
                sx={{mt:1.5}}
                label='Location'
                name={location}
                value={location}
                placeholder='Enter Location'
                onChange={event => {setLocation(event.target.value)}}/>
                </div>
                <div>
             <TextField
                sx={{mt:1.5}}
                fullWidth
                label='Description'
                name={description}
                value={description}
                placeholder='Enter Description'
                multiline
                onChange={event => {setDescription(event.target.value)}}/>
            <TextField
                sx={{mt:1.5}}
                id="filled-number"
                label="Price/night"
                type="number"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={event => {setPrice(event.target.value)}}
            />
                </div>
                <Button
                    sx={{mt:1.5}}
                    variant='contained' 
                    onClick={addHotel}>Add Hotel</Button>
                </Box>
    </div>
)

}

export default NewHotelForm;