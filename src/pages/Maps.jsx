import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const sampleData = [
  { id: 1, position: [51.505, -0.09], info: 'Marker 1' },
  { id: 2, position: [51.515, -0.1], info: 'Marker 2' },
  { id: 3, position: [51.525, -0.11], info: 'Marker 3' },
];

const Maps = () => {
  return (
    <div className="h-screen w-screen">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {sampleData.map(marker => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>{marker.info}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;