import { useState } from "react";
import GraffitiForm from "./components/form";

interface GraffitiSpot {
  id: number;
  title: string;
  description: string;
  author: string;
  photoUrl: string;
  location: { lat: number; lng: number };
}

function App() {
  const [spots, setSpots] = useState<GraffitiSpot[]>([]);

  const addSpot = (data: {
    title: string;
    description: string;
    author: string;
    photo: File;
    location: { lat: number; lng: number };
  }) => {
    const newSpot = {
      id: spots.length + 1,
      title: data.title,
      description: data.description,
      author: data.author,
      photoUrl: URL.createObjectURL(data.photo),
      location: data.location,
    };
    setSpots((prev) => [...prev, newSpot]);
  };

  return (
    <div>
      <GraffitiForm onSubmit={addSpot} />
      {/* Here you can add your map component and pass the spots */}
    </div>
  );
}

export default App;
