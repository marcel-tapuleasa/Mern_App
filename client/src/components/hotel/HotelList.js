import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Hotel from './Hotel';
import GeneralMap from './GeneralMap';
import { withStyles} from '@mui/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const styles = {
    hotelContainer: {
        marginTop: '100px',
        marginLeft: '100px'
    }
}



function HotelList(props) {
    const[hotels, setHotels] = useState([]);
    const { classes} = props;

    useEffect(() =>{
        async function getData() {
            const res = await axios.get('/hotels');
            
            setHotels(res.data);
        }
        getData();},[]
    )

    return(
        <> 
        <GeneralMap/>
        <ImageList>
            <div className={classes.hotelContainer}>{hotels.map(hotel => (
                <ImageListItem  key={hotel._id}>
                        <Hotel 
                            title={hotel.title} 
                            location={hotel.location}
                            id={hotel._id}
                            description={hotel.description}
                            price={hotel.price}
                            images={hotel.images}
                            key={hotel._id}
                        />
                    </ImageListItem>
                
            ))}
            <Button
                variant="contained"
                href='/new'>Add Hotel!</Button>
            </div>
        </ImageList>
        </>
    )
}

export default withStyles(styles)(HotelList);