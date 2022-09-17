import React, {useContext, useState} from 'react';
import axios from 'axios';

import { UserContext } from '../../context/UserContext';


export default function AddPhotos() {

    const [hotel, setHotel] = useState({
        title: '',
        location: '',
        description: '',
        price: ''
    });

    const [fileData, setFileData] = useState();
    const [images, setFile] = useState('');

    
    const [userContext, setUserContext] = useContext(UserContext);  

    const handleChange = (evt) => {
        setHotel({...hotel,
            [evt.target.name]: evt.target.value
        })

    };

    const handleFileChange = ({target}) => {
        setFileData(target.files[0]);
        setFile(target.value)}

    
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const formData = new FormData();

        formData.append('images', fileData);
        formData.append('title', hotel.title);
        formData.append('location', hotel.location);
        formData.append('description', hotel.description);
        formData.append('price', hotel.price);

        const config = {
            credentials: "include",
            headers: {
              "Authorization": `Bearer: ${userContext.token}`
            }
        }
        
        await axios.post('/hotels/new', formData, config)
        
        
    }

     

  return (
    <form encType='multipart/form-data'
        onSubmit={handleSubmit}
         style={{
            marginTop: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            maxWidth: '30%',
        }}>
            <label htmlFor='title'>Add Hotel Name</label>
            <input 
                type='text' 
                name='title'
                value={hotel.title}
                onChange={handleChange}
                id='title'
                placeholder='Enter Hotel Name'
                />


       
            <label htmlFor='location'>Add Hotel Location</label>    
            <input 
                type='text' 
                name='location'
                value={hotel.location}
                onChange={handleChange}
                id='location'
                placeholder='Enter Hotel Location'/>
        

        
            <label htmlFor='description'>Add Hotel Description</label>    
            <textarea 
                type='text' 
                name='description'
                value={hotel.description}
                onChange={handleChange}
                id='description'
                placeholder='Enter Hotel Details'/>
        

        <label htmlFor='price'>Add Rate per night</label>
        <input 
            type='number' 
            name='price'
            value={hotel.price}
            onChange={handleChange}
            id='price'
            placeholder='Enter Hotel Rate'/>

        <label htmlFor='image'>Add Hotel Photos</label>
        <input 
            type='file' 
            name='image'
            value={images}
            accept='image/*'
            onChange={handleFileChange}
            id='image'
            placeholder='Upload Hotel Photos'/>
                
                    
        
        <button type='submit'>Add Hotel with photo</button>
    </form>
  );
}

