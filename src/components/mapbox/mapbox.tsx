import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import Pin from '../draggableMarker/pin';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';

// Don't forget to import the CSS
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const MAPBOX_TOKEN = `${process.env.NEXT_PUBLIC_MAPBOX}`;

const mapbox = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
  };

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  }, []);

  const [events, logEvents] = useState({});

  return (
    <div style={{ height: '70vh', width: 'auto' }}>
      <MapGL ref={mapRef} {...viewport} width="100%" height="100%" onViewportChange={handleViewportChange} mapboxApiAccessToken={MAPBOX_TOKEN}>
        <Geocoder mapRef={mapRef} onViewportChange={handleGeocoderViewportChange} mapboxApiAccessToken={MAPBOX_TOKEN} position="top-right" />
        <Marker longitude={marker.longitude} latitude={marker.latitude} offsetTop={-20} offsetLeft={-10} draggable>
          <Pin size={20} />
        </Marker>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
    </div>
  );
};

export default mapbox;
