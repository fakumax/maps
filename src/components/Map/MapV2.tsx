import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import SnotelSites from '../../utils/santa_julia.json';
import Tooltip from '../Tooltip/Tooltip';

// import the mapbox styles
// alternatively can use a link tag in the head of public/index.html
// see https://docs.mapbox.com/mapbox-gl-js/api/
import 'mapbox-gl/dist/mapbox-gl.css';

// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX}`;

const MapV2 = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
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
      style: 'mapbox://styles/mapbox/light-v10',
      //style: 'mapbox://styles/mapbox/streets-v11',
      // style: 'mapbox://styles/mapbox/streets-v11',
      //style: 'mapbox://styles/mapbox/dark-v10',
      // style: 'mapbox://styles/mapbox/satellite-v9',

      center: [lng, lat],
      zoom: zoom,
      pitch: 0, //inclinación
      bearing: 0, //Rotación mapa
    });

    // only want to work with the map after it has fully loaded
    // if you try to add sources and layers before the map has loaded
    // things will not work properly
    map.on('load', () => {
      // add mapbox terrain dem source for 3d terrain rendering
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxZoom: 16,
      });
      map.setTerrain({ source: 'mapbox-dem' });

      // avalanche paths source
      // example of how to add a custom tileset hosted on Mapbox
      // you can grab the url from the details page for any tileset
      // you have created in Mapbox studio
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector
      map.addSource('avalanche-paths', {
        type: 'vector',
        url: 'mapbox://lcdesigns.arckuvnm',
      });

      // snotel sites source
      // example of using a geojson source
      // data is hosted locally as part of the application
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson
      map.addSource('snotel-sites', {
        type: 'geojson',
        data: SnotelSites,
      });

      // bus routes source
      // another example of using a geojson source
      // this time we are hitting an ESRI API that returns
      // data in the geojson format
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson
      map.addSource('bus-routes', {
        type: 'geojson',
        data: 'https://opendata.arcgis.com/datasets/4347f3565fbe4d5dbb97b016768b8907_0.geojson',
      });

      // avalanche paths - fill layer
      // source-layer can be grabbed from the tileset details page
      // in Mapbox studio
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill
      map.addLayer({
        id: 'avalanche-paths-fill',
        type: 'fill',
        source: 'avalanche-paths',
        'source-layer': 'Utah_Avalanche_Paths-9s9ups',
        paint: {
          'fill-opacity': 0.5,
          'fill-color': '#f05c5c',
        },
      });

      // snotel sites - circle layer
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#circle

      // Add a layer showing the state polygons.
      map.addLayer({
        id: 'snotel-sites-circle',
        type: 'fill',
        source: 'snotel-sites',
        paint: {
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
        },
      });
      //**********************************/
      //COLOR---y forma de puntos--------

      // map.addLayer({
      //   id: 'snotel-sites-circle',
      //   type: 'circle',
      //   source: 'snotel-sites',
      //   paint: {
      //     'circle-color': '#1d1485',
      //     'circle-radius': 8,
      //     'circle-stroke-color': '#ffffff',
      //     'circle-stroke-width': 2,
      //   },
      // });

      //**********************************/

      // snotel sites - label layer
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
      map.addLayer({
        id: 'snotel-sites-label',
        type: 'symbol',
        source: 'snotel-sites',
        layout: {
          'text-field': ['get', 'Station Name'],
          'text-size': 16,
          'text-offset': [0, -1.5],
        },
        paint: {
          'text-color': '#eb2487',
          'text-halo-color': '#ffffff',
          'text-halo-width': 0.5,
        },
      });

      // bus routes - line layer
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line
      map.addLayer({
        id: 'bus-routes-line',
        type: 'line',
        source: 'bus-routes',
        paint: {
          'line-color': '#15cc09',
          'line-width': 4,
        },
      });

      // add a sky layer
      // the sky layer is a custom mapbox layer type
      // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#sky
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });
    });

    // When a click event occurs on a feature in the states layer,
    // open a popup at the location of the click, with description
    // HTML from the click event's properties.
    map.on('click', 'snotel-sites-circle', (e) => {
      new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(e.features[0].properties.name).addTo(map);
    });

    // cleanup function to remove map on unmount
    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '70vh' }} />;
};

export default MapV2;
