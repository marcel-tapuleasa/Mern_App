import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Hotel from './Hotel';
import GeneralMap from './GeneralMap';
import { withStyles} from '@mui/styles';
import styles from '../../styles/HotelListStyles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SearchHotels from './SearchHotels';
import {UserContext} from '../../context/UserContext';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';







function HotelList(props) {
    const[hotels, setHotels] = useState([]);
    const [userContext, setUserContext] = useContext(UserContext);

    const[searchDone, setSearchDone] = useState(false)

    const navigate = useNavigate();


    const { classes} = props;
    


    useEffect(() =>{
        async function getData() {
            const res = await axios.get('/hotels');
            
            setHotels(res.data);
        }
        getData();},[hotels?.length]
    )

    const clearSearch = () => {
        if(userContext.searchHotels && userContext.searchHotels.length > 0) {
        setUserContext(oldValues => {
            return { ...oldValues, searchHotels: [] };
          
        }) 
        navigate('/hotels') 
        }
    }

    const toggleSearchDone = () => {
        setSearchDone(prev => !prev)
    }


    return(
        <> 
            <Container>
                <GeneralMap/>
                <SearchHotels toggleSearchDone={toggleSearchDone}/>
                 {userContext.searchHotels && userContext.searchHotels.length > 0 && <Button onClick={clearSearch}>All Hotels</Button>}
                    <Grid container direction='row' justifyContent='space-around' className={classes.hotelContainer}>
                    
                        {userContext.searchHotels && userContext.searchHotels.length > 0 ?
                        
                        userContext.searchHotels.map(searchHotel => (
                        
                           
                            <Grid item md={6} lg={4} key={searchHotel._id} >
                            <Hotel 
                                title={searchHotel.title} 
                                location={searchHotel.location}
                                id={searchHotel._id}
                                description={searchHotel.description}
                                price={searchHotel.price}
                                images={searchHotel.images}
                                key={searchHotel._id}
                            />
                            </Grid>
                        ))

                      : ( searchDone===false ?
                       
                       hotels.map(hotel => (
                        <Grid item md={6} lg={4} key={hotel._id} sx={{display: 'flex', justifyContent:'space-around'}} >
                                <Hotel 
                                    title={hotel.title}
                                    location={hotel.location}
                                    id={hotel._id}
                                    description={hotel.description}
                                    price={hotel.price}
                                    images={hotel.images}
                                    key={hotel._id}
                                />
                        </Grid>)) :
                        <Typography>No hotels found!</Typography>)

                        }
                
                    </Grid>

            </Container>
        </>
    )
}

export default withStyles(styles)(HotelList);