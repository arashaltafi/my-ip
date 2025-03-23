'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


interface LocationData {
  country: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  query: string;
}

export default function HomePage() {
  const [ip, setIp] = useState<string>('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Fetch the user's public IP using ipify API
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      setIp(ipData.ip);

      // Fetch location details using the obtained IP via ip-api
      const locResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
      const locData = await locResponse.json();
      setLocationData(locData);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="w-full flex flex-col gap-16 items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Your IP Information:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="w-full flex flex-col gap-8 items-center">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col gap-2 border border-black">
            <p><strong>IP:</strong> {ip}</p>
            {locationData && (
              <>
                <p><strong>Country:</strong> {locationData.country}</p>
                <p><strong>Region:</strong> {locationData.regionName}</p>
                <p><strong>City:</strong> {locationData.city}</p>
                <p><strong>ZIP:</strong> {locationData.zip}</p>
                <p><strong>Latitude:</strong> {locationData.lat}</p>
                <p><strong>Longitude:</strong> {locationData.lon}</p>
                <p><strong>Timezone:</strong> {locationData.timezone}</p>
                <p><strong>ISP:</strong> {locationData.isp}</p>
              </>
            )}
          </div>
          {locationData && (
            <div className="w-full max-w-md h-96">
              <MapContainer
                center={[locationData.lat, locationData.lon]}
                zoom={13}
                scrollWheelZoom={true}
                attributionControl={false}
                className="w-full h-full rounded-lg shadow-md border border-black"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[locationData.lat, locationData.lon]} icon={customIcon}>
                  <Popup>
                    {locationData.city}, {locationData.country}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>
      )}
    </main>
  );
}