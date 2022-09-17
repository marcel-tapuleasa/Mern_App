// CLASS BASED COMPONENT

// import React, {Component} from 'react';
// import axios from 'axios';

// class HotelList extends Component {
//     constructor(props) {
//         super(props);
//         this.state= {hotels:[{title:''}]}
//     }
//     componentDidMount() {
//     axios.get('http://localhost:5000/hotelslist').then(response =>{
//         this.setState({hotels: response.data})
//         console.log(response);
//         console.log(this.state.hotels[0].title)
//     });
// }

// render() {

//     return(
//         <div>
//             <ul>{this.state.hotels.map(hotel => (

//                 <li>{hotel.title}</li>))}
//             </ul>
//         </div>
//     )}

// }

// export default HotelList;

// FUNCTION COMPONENT

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Hotel from './Hotel';
import { withStyles} from '@mui/styles';


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
        <div className={classes.hotelContainer}>{hotels.map(hotel => (
                    <Hotel 
                        title={hotel.title} 
                        location={hotel.location}
                        id={hotel._id}
                        description={hotel.description}
                        price={hotel.price}
                        images={hotel.images}
                        key={hotel._id}
                    />
            
        ))}
        <Button
            variant="contained"
            href='/new'>Add Hotel!</Button>
        </div>
        
    )
}

export default withStyles(styles)(HotelList);