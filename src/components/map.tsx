import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 40.4168, // Example: Madrid
  lng: -3.7038,
};

const GraffitiMap = () => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Example Marker */}
        <Marker position={{ lat: 40.4168, lng: -3.7038 }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GraffitiMap;
