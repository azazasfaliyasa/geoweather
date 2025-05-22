import { useState, useEffect } from "react";

type GeolocationStatus = "idle" | "loading" | "success" | "error";

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>("idle");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser ini.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setStatus("success");
      },
      (err) => {
        let message = "Terjadi kesalahan saat mengambil lokasi.";
        if (err.code === 1) message = "Akses lokasi ditolak.";
        else if (err.code === 2) message = "Lokasi tidak tersedia.";
        else if (err.code === 3) message = "Waktu permintaan lokasi habis.";

        setError(message);
        setStatus("error");
      }
    );
  }, []);

  return { location, error, status };
}