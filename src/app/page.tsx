"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SearchLocation from "@/components/SearchLocation";
import WeatherInfo from "@/components/WeatherInfo";
import { fetchWeatherByQuery, fetchWeatherByCoords } from "@/services/weather";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { WeatherData } from "@/types/weather";
import { showCustomToast } from "@/components/CustomToast";

const LeafletMapClient = dynamic(() => import("@/components/LeafletMapClient"), {
  ssr: false,
});

export default function Home() {
  const { location, status } = useGeolocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Ambil cuaca dari lokasi user
  useEffect(() => {
    if (status === "success" && location) {
      setLoading(true);
      fetchWeatherByCoords(location.lat, location.lon)
        .then((data) => {
          setWeatherData(data);
          showCustomToast({
            message: "✅ Berhasil mengambil data cuaca berdasarkan lokasi Anda.",
            type: "success",
            duration: 4000,
          });
        })
        .catch(() => {
          showCustomToast({
            message: "❌ Gagal mengambil data cuaca berdasarkan lokasi Anda.",
            type: "error",
            duration: 6000,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [location, status]);

  // Handler pencarian manual
  function handleSearch(query: string) {
    setLoading(true);
    fetchWeatherByQuery(query)
      .then((data) => {
        setWeatherData(data);
        showCustomToast({
          message: "✅ Berhasil mengambil data cuaca berdasarkan pencarian Anda.",
          type: "success",
          duration: 4000,
        });
      })
      .catch(() => {
        showCustomToast({
          message: "❌ Gagal mengambil data cuaca berdasarkan pencarian Anda.",
          type: "error",
          duration: 6000,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <SearchLocation onSearch={handleSearch} />
      {loading && <p className="text-white text-center">Loading...</p>}
      {weatherData && <WeatherInfo data={weatherData} />}
      {weatherData?.location && <LeafletMapClient location={weatherData.location} />}
    </main>
  );
}