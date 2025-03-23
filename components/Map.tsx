"use client"

import React from 'react'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LocationData } from '@/utils/Types';

const Map = (props: LocationData) => {
    const customIcon = new L.Icon({
        iconUrl: "/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <div className="w-full max-w-md h-96">
            <MapContainer
                center={[props.lat, props.lon]}
                zoom={13}
                scrollWheelZoom={true}
                attributionControl={false}
                className="w-full h-full rounded-lg shadow-md border border-black"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[props.lat, props.lon]} icon={customIcon}>
                    <Popup>
                        {props.city}, {props.country}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map