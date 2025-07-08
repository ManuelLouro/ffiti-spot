import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const mapOptions = {
  styles: [
    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  ],
};

const GraffitiMap = () => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 41.3851, lng: 2.1734 }); // default center

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // fallback if error or denied
          setCenter({ lat: 41.3851, lng: 2.1734 });
        }
      );
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={19}
        options={mapOptions}
      >
        {/* No markers here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default GraffitiMap;
