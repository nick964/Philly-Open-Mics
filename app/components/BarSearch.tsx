import { useState } from 'react';
import axios from 'axios';

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

interface Location
{
  address: string;
  lat: number;
  lng: number;
}
export default function BarSearch() {
  const [query, setQuery] = useState(''); // The user's input for bar name
  const [location, setLocation] = useState<Location | null>(null);

  const handleSearch = async () => {
    if (!query) return;

    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
    const params = {
      input: query,
      inputtype: 'textquery',
      fields: 'formatted_address,geometry',
      key: 'AIzaSyC1kfrj0JVo-ze_E_4wEbw3UzWtOQzJYBk',
    };

    try {
      const response = await axios.get(url, { params });
      console.log('Response:', response.data);
      const result = response.data.candidates[0]; // Get the first result

      if (result) {
        setLocation({
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        });
      } else {
        alert('No location found');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div>
      <h2>Search for a Bar</h2>
      <input
        type="text"
        placeholder="Enter bar name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {location && (
        <div>
          <h3>Location Details</h3>
          <p>Address: {location.address}</p>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
    </div>
  );
}
