import React, { useState, useEffect } from 'react';
import classes from './map.module.css';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { toast } from 'react-toastify';
import * as L from 'leaflet';

export default function Map({ readonly, location, onChange }) {
  const indiaBounds = [
    [6.753515, 68.162386], // Southwest coordinates of India
    [35.674545, 97.395555], // Northeast coordinates of India
  ];

  return (
    <div className={classes.container}>
      <MapContainer
        className={classes.map}
        center={[20.5937, 78.9629]} // Centered on India
        zoom={5}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
        bounds={indiaBounds}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FindButtonAndMarker
          readonly={readonly}
          location={location}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
}

function FindButtonAndMarker({ readonly, location, onChange }) {
  const [position, setPosition] = useState(location);

  useEffect(() => {
    if (readonly) {
      map.setView(position, 13);
      return;
    }
    if (position) onChange(position);
  }, [position]);

  const map = useMapEvents({
    click(e) {
      if (!readonly && isInsideIndia(e.latlng)) {
        setPosition(e.latlng);
      } else {
        toast.error('Please select a location within India.');
      }
    },
    locationfound(e) {
      if (isInsideIndia(e.latlng)) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 13);
      } else {
        toast.error('Please select a location within India.');
      }
    },
    locationerror(e) {
      toast.error(e.message);
    },
  });

  const isInsideIndia = (latlng) => {
    const lat = latlng.lat;
    const lng = latlng.lng;
    return lat >= 6.753515 && lat <= 35.674545 && lng >= 68.162386 && lng <= 97.395555;
  };
  const markerIcon = new L.Icon({
    iconUrl: '/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });
  return (
    <>
      {!readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={() => map.locate()}
        >
          Find My Location
        </button>
      )}

      {position && (
        <Marker
          eventHandlers={{
            dragend: (e) => {
              setPosition(e.target.getLatLng());
            },
          }}
          position={position}
          draggable={!readonly}
          icon={markerIcon}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}
    </>
  );
}
