import React from 'react';
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer, Popup } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import SnotelSites from '../../utils/santa_julia.json';

// Don't forget to import the CSS
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';
const Mapp = () => {
  const MAPBOX_TOKEN = `${process.env.NEXT_PUBLIC_MAPBOX}`;

  const Map = ReactMapboxGl({
    accessToken: MAPBOX_TOKEN,
  });
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '70vh',
        width: 'auto',
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.13235092163085938, 51.518250335096376]} />
      </Layer>
      <DrawControl />

      <GeoJSONLayer
        data={SnotelSites}
        symbolLayout={{
          'text-field': '{snotel-sites}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
        }}
      />
      <Popup
        coordinates={[-0.13235092163085938, 51.518250335096376]}
        offset={{
          'bottom-left': [12, -38],
          bottom: [0, -38],
          'bottom-right': [-12, -38],
        }}
      >
        <h1>Popup</h1>
      </Popup>
    </Map>
  );
};

export default Mapp;
