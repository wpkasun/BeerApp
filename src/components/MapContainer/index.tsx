import React from 'react';
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

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
