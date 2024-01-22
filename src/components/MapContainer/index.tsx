import React from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../api/config';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Props {
  latitude: number;
  longitude: number;
}

const MapContainer = (props: Props) => {
  const mapStyles: React.CSSProperties = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter: google.maps.LatLngLiteral = {
    lat: props.latitude,
    lng: props.longitude,
  };

  console.log(GOOGLE_MAPS_API_KEY);

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY || ''}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
