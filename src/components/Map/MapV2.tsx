import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import SnotelSites from '../../utils/santa_julia.json';

import Plaga from '../../utils/plagas.json';

//import Tooltip from '../Tooltip/Tooltip';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import the mapbox styles
// alternatively can use a link tag in the head of public/index.html
// see https://docs.mapbox.com/mapbox-gl-js/api/
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '@styles/Map.module.scss';
import { Box } from '@chakra-ui/react';
// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX}`;

const MapV2 = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [styleMap, SetstyleMap] = useState(null);

  const [lng, setLng] = useState(-70.6504502);
  const [lat, setLat] = useState(-33.4377756);
  const [zoom, setZoom] = useState(8);

  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only rendered once
  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      //style: 'mapbox://styles/mapbox/light-v10',
      //style: 'mapbox://styles/mapbox/streets-v11',
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: 'mapbox://styles/mapbox/dark-v10',
      //style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom,
      pitchWithRotate: false,
      dragRotate: true,
      touchZoomRotate: true,
    });

    // CONTROL -- Add zoom and rotation controls to the map.
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, 'top-right');

    // CONTROL -- Full Screen Button.
    map.addControl(new mapboxgl.FullscreenControl());

    // CONTROL -- Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // Transparent circle will be drawn around the user
        showAccuracyCircle: false,
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    // CONTROL -- Add Ubication Geocoder control to the map.
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        //Marker
        //mapboxgl: mapboxgl,
      })
    );

    /*
      DATOS DE PLAGA
      
      */
    map.on('load', () => {
      // Add a geojson point source.
      // Heatmap layers also work with a vector tile source.
      map.addSource('plagas', {
        type: 'geojson',
        data: Plaga,
      });

      map.addLayer(
        {
          id: 'plagas-heat',
          type: 'heatmap',
          source: 'plagas',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property quantity
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'cant'], 0, 0, 6, 1],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)',
            ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
          },
        },
        'waterway-label'
      );

      map.addLayer(
        {
          id: 'plagas-point',
          type: 'circle',
          source: 'plagas',
          minzoom: 7,
          paint: {
            // Size circle radius by plag  magnitude and zoom level
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, ['interpolate', ['linear'], ['get', 'cant'], 1, 1, 6, 4], 16, ['interpolate', ['linear'], ['get', 'cant'], 1, 5, 6, 50]],
            // Color circle by plag magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'cant'],
              0,
              'rgba(33,102,172,0)',
              1,
              //VERDE
              'rgb(5,253,0)',
              2,
              //AMARILLO
              'rgb(211,253,0)',
              3,
              //ROJO
              'rgb(253,0,0)',
              4,
              'rgb(239,138,98)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)',
            ],
            'circle-stroke-color': 'green', //'white' or color
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0, 8, 1],
          },
        },
        'waterway-label'
      );
    });
    ///////////////////////////
    /////////////
    map.on('click', 'plaga-aphis-circle', (e) => {
      new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(e.features[0].properties.name).addTo(map);
    });

    /////////////
    // cleanup function to remove map on unmount
    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className={styles.mapboxgl_map} />;
};

export default MapV2;
