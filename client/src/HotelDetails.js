import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

import useToggle from './hooks/useToggleState';
import EditHotelForm from './EditHotelForm';


function HotelDetails (props) {
    const [details, setDetails] = useState([]);
    const[isEditing, toggle] = useToggle(false);
    let {id} = useParams();
    let navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const res = await axios.get(`http://localhost:5000/hotels/${id}`);
            setDetails(res.data); 
        }
        getData();}, [id]
    )

    const removeHotel = async (id) => {
        await axios.delete(`http://localhost:5000/hotels/${id}`, {_id:id})
        navigate('/hotels')

    }


    return(
        <div>
            {isEditing ? <EditHotelForm title={details.title} location={details.location} id={details._id}/> : <>
            <h1>{details.title}</h1>
            <h1>{details.location}</h1>
            <a href='/hotels'>Go Back</a>
            <button onClick={toggle}>Edit</button> 
            <button onClick={()=>removeHotel(id)}>Delete!</button></>}
        </div>
    )
}

export default HotelDetails;