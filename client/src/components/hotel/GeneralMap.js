import React, {useEffect, useRef} from 'react';
import axios from 'axios';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2VsdGFwdWxlYXNhIiwiYSI6ImNsODJ0ZGpnbjAwdjczdnA3MnhneWN0c2wifQ._V9xXIB_NXdZiBAdB-4Haw';


const GeneralMap = () => {
    
    const generalMapContainer = useRef(null);
    const map = useRef(null);
  
    
  useEffect(() => {

    async function displayMap() {
    
    if (map.current) return;

    const res = await axios.get('https://hoteltips.onrender.com/hotels');
    const hotelsFeatures = {features: (res.data)};
    // console.log(hotelsFeatures);
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY2VsdGFwdWxlYXNhIiwiYSI6ImNsODJ0ZGpnbjAwdjczdnA3MnhneWN0c2wifQ._V9xXIB_NXdZiBAdB-4Haw';
      map.current = new mapboxgl.Map({
      container: generalMapContainer.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/light-v10',
      center: [9.10, 45.28],
      zoom: 4
      });
      
      map.current.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.current.addSource('hotels', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: hotelsFeatures,
      // 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
      
      map.current.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'hotels',
      filter: ['has', 'point_count'],
      paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': [
      'step',
      ['get', 'point_count'],
      '#90CAF9',
      3,
      '#2196F3',
      5,
      '#0D47A1'
      ],
      'circle-radius': [
      'step',
      ['get', 'point_count'],
      20,
      3,
      30,
      5,
      40
      ]
      }
      });
      
      map.current.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'hotels',
      filter: ['has', 'point_count'],
      layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
      }
      });
      
      map.current.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'hotels',
      filter: ['!', ['has', 'point_count']],
      paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
      }
      });
      
      // inspect a cluster on click
      map.current.on('click', 'clusters', (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
      layers: ['clusters']
      });
      const clusterId = features[0].properties.cluster_id;
      map.current.getSource('hotels').getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
      if (err) return;
      
      map.current.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
      });
      }
      );
      });
      
      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.current.on('click', 'unclustered-point', (e) => {

      const text = e.features[0].properties.popUpMarkup;
      const coordinates = e.features[0].geometry.coordinates.slice(); 
      // const mag = e.features[0].properties.mag;
      // const tsunami =
      // e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
      
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      
      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(
      text
      )
      .addTo(map.current);
      });
      
      map.current.on('mouseenter', 'clusters', () => {
      map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('mouseleave', 'clusters', () => {
      map.current.getCanvas().style.cursor = '';
      });
      }); 
  }; displayMap()})    


  return (
    <div ref={generalMapContainer} style={{marginTop: '100px', height: '500px', width: '100%', zIndex: 1, borderRadius: '0.5rem', boxShadow: '10px 10px 20px -10px #EACDF2'}}></div>
  )
}

export default GeneralMap;
