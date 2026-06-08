"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ filteredLocations }: { filteredLocations: any[] }) {
  useEffect(() => {
    // Fix for Leaflet marker icons in Next.js
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }

    // Ultimate cleanup for React Strict Mode "Map container is already initialized" error
    return () => {
      const container = document.getElementById('map-container') as any;
      if (container && container._leaflet_id) {
        container._leaflet_id = null;
      }
    };
  }, []);

  return (
    <MapContainer 
      id="map-container"
      center={[23.1765, 75.7885]} 
      zoom={14} 
      className="w-full h-full z-10"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredLocations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup className="custom-popup">
            <div className="p-1 min-w-[200px]">
              <h3 className="font-bold text-gray-900 mb-1">{loc.name}</h3>
              <p className="text-xs text-gray-600 font-hindi mb-2">{loc.nameHi}</p>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{loc.description}</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full bg-sacred-500 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-sacred-600 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
