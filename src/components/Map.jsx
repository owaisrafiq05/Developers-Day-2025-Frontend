'use client'
import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const latitude = 37.7749; // Example Latitude
  const longitude = -122.4194; // Example Longitude
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; //store in .env.local

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude]
  );

  if (loadError) return <div>Error loading maps!</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={15}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapComponent;
