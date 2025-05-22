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
    if (!location) return;

    // Pastikan elemen #map sudah ada di DOM
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // Bersihkan isi elemen map sebelum inisialisasi ulang (optional)
    mapElement.innerHTML = "";

    // Inisialisasi map
    const map = L.map("map").setView([location.lat, location.lon], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([location.lat, location.lon])
      .addTo(map)
      .bindPopup(`<b>${location.name || "Lokasi"}</b>`)
      .openPopup();

    return () => {
      map.remove();
    };
  }, [location]);

  return <div id="map" className="h-[400px] w-full rounded shadow-lg mt-4"></div>;
}