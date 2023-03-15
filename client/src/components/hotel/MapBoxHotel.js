import React, {useEffect, useRef, useState} from 'react';
// import { UserContext } from '../../context/UserContext';
import axiosRender from '../../utils/axios';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2VsdGFwdWxlYXNhIiwiYSI6ImNsODJ0ZGpnbjAwdjczdnA3MnhneWN0c2wifQ._V9xXIB_NXdZiBAdB-4Haw';

export default function MapBoxHotel(props) {

    
 
// const [userContext, setUserContext] = useContext(UserContext);   

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);

useEffect(() => {
    // console.log('UseEffect for Geometry!!!')
    async function getGeometry() {
    const res = await axiosRender.get(`/hotels/geometry/${props.hotelId}`);
    // console.log(`${res.data.coordinates[0]} - ${res.data.coordinates[1]}`)
    setLng(res.data.coordinates[0]);
    setLat(res.data.coordinates[1]);
    }
    // console.log(`Longitude: ${lng} - Latitude:${lat}`);
getGeometry()
}, [])

useEffect(() => {
   
    // if (map.current) return; // initialize map only once
    // console.log('MapBox UseEffect!!!')
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng,lat],
    zoom: zoom
    });



    new mapboxgl.Marker()
        .setLngLat([lng,lat])
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${props.title}</h3><p>${props.location}</p>`
            )
        )
        .addTo(map.current)
    }, [lng, lat]);


return (

<div ref={mapContainer} 
style={{height: '500px', width: '100%', borderRadius: '0.5rem', boxShadow: '10px 10px 20px -10px #EACDF2'}}/>
)

};

