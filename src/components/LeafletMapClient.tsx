"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapClientProps {
  location?: {
    lat: number;
    lon: number;
    name?: string;
  };
}

export default function LeafletMapClient({ location }: LeafletMapClientProps) {
  useEffect(() => {
    const fallbackLocation = {
      lat: -6.2,
      lon: 106.816666,
      name: "Lokasi default (Jakarta)",
    };

    const currentLocation = location ?? fallbackLocation;

    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // Bersihkan elemen sebelum render ulang
    mapElement.innerHTML = "";

    // Inisialisasi peta
    const map = L.map(mapElement).setView(
      [currentLocation.lat, currentLocation.lon],
      11
    );

    // Tambahkan layer peta dari OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Tambahkan marker
    L.marker([currentLocation.lat, currentLocation.lon])
      .addTo(map)
      .bindPopup(`<b>${currentLocation.name}</b>`)
      .openPopup();

    // Cleanup saat unmount
    return () => {
      map.remove();
    };
  }, [location]);

  return (
    <div
      id="map"
      className="h-[400px] w-full rounded shadow-lg mt-4 z-0"
    ></div>
  );
}