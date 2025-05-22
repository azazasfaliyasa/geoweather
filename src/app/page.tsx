"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SearchLocation from "@/components/SearchLocation";
import WeatherInfo from "@/components/WeatherInfo";
import { fetchWeatherByQuery, fetchWeatherByCoords } from "@/services/weather";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { WeatherData } from "@/types/weather";

// Dynamic import LeafletMapClient supaya hanya render di client (ssr: false)
const LeafletMapClient = dynamic(() => import("@/components/LeafletMapClient"), {
  ssr: false,
});

export default function Home() {
  const { location, error: geoError } = useGeolocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ambil cuaca berdasar koordinat device jika ada lokasi
  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchWeatherByCoords(location.lat, location.lon)
        .then(setWeatherData)
        .catch(() => setError("Gagal mengambil data cuaca berdasarkan lokasi Anda."))
        .finally(() => setLoading(false));
    }
  }, [location]);

  function handleSearch(query: string) {
    setLoading(true);
    setError(null);
    fetchWeatherByQuery(query)
      .then(setWeatherData)
      .catch(() => setError("Gagal mengambil data cuaca berdasarkan pencarian Anda."))
      .finally(() => setLoading(false));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <SearchLocation onSearch={handleSearch} />
      {geoError && <p className="text-red-400 text-center">{geoError}</p>}
      {loading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}
      {/* Render WeatherInfo hanya jika data ada */}
      {weatherData && <WeatherInfo data={weatherData} />}
      {/* Render Leaflet map client-side only */}
      <LeafletMapClient location={weatherData?.location} />
    </main>
  );
}