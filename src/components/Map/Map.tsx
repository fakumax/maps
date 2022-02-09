import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';

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
        <Feature coordinates={[-27.3628663, -55.9024639]} />
      </Layer>
      <DrawControl />
    </Map>
  );
};

export default Mapp;
