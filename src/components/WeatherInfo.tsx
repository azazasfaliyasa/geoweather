"use client";

import { WeatherData } from "@/types/weather";
import Image from "next/image";

interface WeatherInfoProps {
  data: WeatherData;
}

export default function WeatherInfo({ data }: WeatherInfoProps) {
  if (!data) return null;

  const { location, current } = data;

  return (
    <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-md mx-auto mt-6 p-6 text-gray-800">
      <h2 className="text-2xl font-semibold mb-2 text-center">{location.name}, {location.country}</h2>
      <p className="text-sm text-center text-gray-500 mb-4">Local Time: {location.localtime}</p>

      <div className="flex items-center justify-center mb-4">
        <Image
          src={`https:${current.condition.icon}`}
          alt={current.condition.text}
          width={64}
          height={64}
          className="mr-2"
        />
        <div>
          <p className="text-xl">{current.temp_c}°C</p>
          <p className="text-sm text-gray-600">{current.condition.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col items-center">
          <span className="font-medium">Feels Like</span>
          <span>{current.feelslike_c}°C</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Humidity</span>
          <span>{current.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Wind</span>
          <span>{current.wind_kph} km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-medium">Latitude / Longitude</span>
          <span>{location.lat}, {location.lon}</span>
        </div>
      </div>
    </div>
  );
}