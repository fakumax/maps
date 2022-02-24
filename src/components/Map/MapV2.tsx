import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import SnotelSites from '../../utils/santa_julia.json';
//import Tooltip from '../Tooltip/Tooltip';

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
      // style: 'mapbox://styles/mapbox/satellite-v9',
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

    // only want to work with the map after it has fully loaded
    // if you try to add sources and layers before the map has loaded
    // things will not work properly

    map.on('load', () => {
      /************** HEATMAP ***********/
      map.addSource('trees', {
        type: 'geojson',
        data: '@utils/features.geojson',
      });

      map.addLayer(
        {
          id: 'trees-heat',
          type: 'heatmap',
          source: 'trees',
          maxzoom: 15,
          paint: {
            // increase weight as diameter breast height increases
            'heatmap-weight': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [1, 0],
                [62, 1],
              ],
            },
            // increase intensity as zoom level increases
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3],
              ],
            },
            // use sequential color palette to use exponentially as the weight increases
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(236,222,239,0)',
              0.2,
              'rgb(208,209,230)',
              0.4,
              'rgb(166,189,219)',
              0.6,
              'rgb(103,169,207)',
              0.8,
              'rgb(28,144,153)',
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
              stops: [
                [11, 15],
                [15, 20],
              ],
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
              default: 1,
              stops: [
                [14, 1],
                [15, 0],
              ],
            },
          },
        },
        'waterway-label'
      );
      map.addLayer(
        {
          id: 'trees-point',
          type: 'circle',
          source: 'trees',
          minzoom: 14,
          paint: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [{ zoom: 15, value: 1 }, 5],
                [{ zoom: 15, value: 62 }, 10],
                [{ zoom: 22, value: 1 }, 20],
                [{ zoom: 22, value: 62 }, 50],
              ],
            },
            'circle-color': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [0, 'rgba(236,222,239,0)'],
                [10, 'rgb(236,222,239)'],
                [20, 'rgb(208,209,230)'],
                [30, 'rgb(166,189,219)'],
                [40, 'rgb(103,169,207)'],
                [50, 'rgb(28,144,153)'],
                [60, 'rgb(1,108,89)'],
              ],
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': {
              stops: [
                [14, 0],
                [15, 1],
              ],
            },
          },
        },
        'waterway-label'
      );
      /************** HEATMAP ***********/
      // Add a geojson point source.
      // Heatmap layers also work with a vector tile source.
      map.addSource('earthquakes', {
        type: 'geojson',
        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
      });

      map.addLayer(
        {
          id: 'earthquakes-heat',
          type: 'heatmap',
          source: 'earthquakes',
          maxzoom: 9,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
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
      map.addLayer(
        {
          id: 'earthquakes-point',
          type: 'circle',
          source: 'earthquakes',
          minzoom: 7,
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4], 16, ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'mag'],
              1,
              'rgba(33,102,172,0)',
              2,
              'rgb(103,169,207)',
              3,
              'rgb(209,229,240)',
              4,
              'rgb(253,219,199)',
              5,
              'rgb(239,138,98)',
              6,
              'rgb(178,24,43)',
            ],
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
          },
        },
        'waterway-label'
      );
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
    map.on('click', 'trees-point', (event) => {
      new mapboxgl.Popup().setLngLat(event.features[0].geometry.coordinates).setHTML(`<strong>DBH:</strong> ${event.features[0].properties.dbh}`).addTo(map);
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

  return <div ref={mapContainer} className={styles.mapboxgl_map} />;
};

export default MapV2;
