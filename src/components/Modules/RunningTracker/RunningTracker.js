import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';

const RunningTracker = () => {
  const [position, setPosition] = useState(null);
  const [route, setRoute] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isTracking, setIsTracking] = useState(false);

  const unicodeIcon = divIcon({
    className: 'custom-icon',
    html: '&#x1F3C3;', // Unicode for the runner emoji
    iconSize: [20, 20]
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handlePosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handlePosition = (position) => {
    const newPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setPosition(newPosition);
    if (isTracking) {
      setRoute((oldRoute) => [...oldRoute, newPosition]);
    }
  };

  const startTracking = () => {
    setIsTracking(true);
    setRoute([]);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setRoutes((oldRoutes) => [...oldRoutes, route]);
  };

  return (
    <div>
      <h1>Running Tracker</h1>
      <button onClick={startTracking} style={{ backgroundColor: isTracking ? 'green' : 'initial' }}>Start</button>
      <button onClick={stopTracking} style={{ backgroundColor: isTracking ? 'initial' : 'red' }}>Stop</button>
      {routes.map((route, index) => (
        <div key={index}>
          <h2>Route {index + 1}</h2>
          {route.map((position, index) => (
            <p key={index}>Position {index + 1}: {position.lat}, {position.lng}</p>
          ))}
        </div>
      ))}
      {position && (
        <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={unicodeIcon} />
          {isTracking && <Polyline positions={route} color='red' />}
        </MapContainer>
      )}
    </div>
  );
};

export default RunningTracker;