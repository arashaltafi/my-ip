"use client"

import React from 'react'
import { LocationData } from '@/utils/Types';
import { useEffect, useState } from 'react';
import MapComponent from './MapComponent';

const UserData = () => {
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
            const locResponse = await fetch(`https://ipwho.is/${ipData.ip}`);
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
            {
                loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : (
                    <div className="w-full flex flex-col gap-8 items-center">
                        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col gap-2 border border-black">
                            <p><strong>IP:</strong> {ip}</p>
                            {
                                locationData && (
                                    <>
                                        <p><strong>Type:</strong> {locationData.type}</p>
                                        <p><strong>Continent:</strong> {locationData.continent}</p>
                                        <p><strong>ContinentCode:</strong> {locationData.continent_code}</p>
                                        <p><strong>Country:</strong> {locationData.country}</p>
                                        <p><strong>CountryCode:</strong> {locationData.country_code}</p>
                                        <p><strong>Region:</strong> {locationData.region}</p>
                                        <p><strong>RegionCode:</strong> {locationData.region_code}</p>
                                        <p><strong>City:</strong> {locationData.city}</p>
                                        <p><strong>Latitude:</strong> {locationData.latitude}</p>
                                        <p><strong>Longitude:</strong> {locationData.longitude}</p>
                                        <p><strong>IsEu:</strong> {locationData.is_eu}</p>
                                        <p><strong>postal:</strong> {locationData.postal}</p>
                                        <p><strong>CallingCode:</strong> {locationData.calling_code}</p>
                                        <p><strong>Capital:</strong> {locationData.capital}</p>
                                        <p><strong>Borders:</strong> {locationData.borders}</p>
                                    </>
                                )
                            }
                        </div>
                        {
                            locationData && (
                                <MapComponent {...locationData} />
                            )
                        }
                    </div>
                )
            }
        </main>
    )
}

export default UserData