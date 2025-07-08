import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 40.4168,
  lng: -3.7038,
};

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [pinPosition, setPinPosition] = useState<{ lat: number; lng: number } | null>(null);

  // Only set pin if form is open
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!showForm) return;
    if (event.latLng) {
      setPinPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setPinPosition(null);
  };

  return (
    <div className="relative h-screen bg-black text-white">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div className="h-[90vh] w-full border-4 border-darkred rounded-md">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={handleMapClick}
            options={{
              styles: [
                // Optional: add dark mode map styles here
              ],
            }}
          >
            {showForm && pinPosition && <Marker position={pinPosition} />}
          </GoogleMap>
        </div>
      </LoadScript>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md"
        >
          Add Spot
        </button>
      )}

      {showForm && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10 p-4">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-sm space-y-4">
            <h2 className="text-lg font-bold">Add Graffiti Spot</h2>
            <p className="text-sm text-gray-600">Click on the map to place your pin</p>
            <form>
              <input
                type="text"
                placeholder="Title"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Author (optional)"
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                placeholder="Description"
                className="w-full px-3 py-2 border rounded resize-none"
                rows={4}
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="w-full text-sm mt-1 text-gray-600 underline"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

