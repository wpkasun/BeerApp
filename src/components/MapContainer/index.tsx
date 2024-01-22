import React from 'react';
import { GoogleMap, useLoadScript, Marker, Libraries } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../api/config';

interface Props {
  latitude: number;
  longitude: number;
}

const MapContainer = (props: Props) => {
  const center: google.maps.LatLngLiteral = {
    lat: props.latitude,
    lng: props.longitude,
  };

  //const libraries: Libraries = ['places'];

  const mapStyles: React.CSSProperties = {
    height: '400px',
    width: '100%',
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY ? GOOGLE_MAPS_API_KEY : '',
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={center}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
