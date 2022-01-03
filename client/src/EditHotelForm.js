import React from "react";
import {useNavigate} from 'react-router-dom';
import useInputState from './hooks/useInputState';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function EditHotelForm(props) {
    const [value, handleChange]= useInputState(props);
    let navigate = useNavigate();



    const updateHotel = (id) => {
        axios.put(`http://localhost:5000/hotels/${id}/edit`, {_id: id, title: value.title, location: value.location, description: value.description, price: value.price})
        .then(()=> {
            alert('It worked')})
        .catch(()=> {
            alert('Error!!!')})
            navigate('/hotels')
    };
    
    return(
            <Box component='form'
            sx={{ width: '40%', display: 'flex', flexWrap: 'wrap', mt: 2, flexDirection:'column'}}>
            <TextField label='Change Hotel Name' sx={{mt:1.5}} type='text' name='title' value={value.title} onChange={handleChange}/>
            <TextField label='Change Location' sx={{mt:1.5}} type='text' name='location' value={value.location} onChange={handleChange}/>
            <TextField label='Edit Description' sx={{mt:1.5}} type='text' name='description' value={value.description} onChange={handleChange}/>
            <TextField label='Change Price' sx={{mt:1.5}} name='price' value={value.price} onChange={handleChange}
            type="number"
            InputLabelProps={{
            shrink: true,
            }}
            />
            <Button sx={{mt:3}} variant='contained' onClick={() => updateHotel(props.id)}>Update!</Button>
            </Box>
            
    )
}

export default EditHotelForm;

