import type { WeatherData } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

if (!API_KEY) {
  throw new Error("API key untuk WeatherAPI tidak ditemukan. Pastikan sudah diatur di .env.local");
}

// Ambil cuaca berdasarkan nama lokasi (kota, negara, dll)
export async function fetchWeatherByQuery(query: string): Promise<WeatherData> {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Response Error (Query):", res.status, errorText);
      throw new Error(`Gagal mengambil data cuaca. Status: ${res.status}`);
    }

    const data = await res.json();
    return data as WeatherData;
  } catch (error) {
    console.error("fetchWeatherByQuery Error:", error);
    throw new Error("Terjadi kesalahan saat mengambil data cuaca berdasarkan pencarian.");
  }
}

// Ambil cuaca berdasarkan koordinat GPS (latitude & longitude)
export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Response Error (Coords):", res.status, errorText);
      throw new Error(`Gagal mengambil data cuaca. Status: ${res.status}`);
    }

    const data = await res.json();
    return data as WeatherData;
  } catch (error) {
    console.error("fetchWeatherByCoords Error:", error);
    throw new Error("Terjadi kesalahan saat mengambil data cuaca berdasarkan koordinat.");
  }
}