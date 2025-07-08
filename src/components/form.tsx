import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = { lat: 40.4168, lng: -3.7038 }; // default location (Madrid for example)

interface Props {
  onSubmit: (data: {
    title: string;
    description: string;
    author: string;
    photo: File;
    location: { lat: number; lng: number };
  }) => void;
}

const GraffitiForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("unknown");
  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState(defaultCenter);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      alert("Please upload a photo");
      return;
    }
    onSubmit({ title, description, author, photo, location });
    // Optionally reset form here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && setPhoto(e.target.files[0])}
        required
      />

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={14}
          onClick={handleMapClick}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>

      <button type="submit" className="btn btn-primary">
        Submit Graffiti Spot
      </button>
    </form>
  );
};

export default GraffitiForm;
