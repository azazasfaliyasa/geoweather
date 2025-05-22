import { useState, useEffect } from "react";
import { showCustomToast } from "@/components/CustomToast";

type GeolocationStatus = "idle" | "loading" | "success" | "error";

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>("idle");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      const message = "Geolocation tidak didukung oleh browser ini.";
      setError(message);
      setStatus("error");
      showCustomToast({ message, type: "error", duration: 6000 });
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setLocation(coords);
        setError(null);
        setStatus("success");
        showCustomToast({
          message: "Berhasil mendeteksi lokasi Anda.",
          type: "success",
          duration: 4000,
        });
      },
      (err) => {
        let message = "Terjadi kesalahan saat mengambil lokasi.";
        if (err.code === 1) message = "Akses lokasi ditolak, aktifkan izin lokasi.";
        else if (err.code === 2) message = "Lokasi tidak tersedia.";
        else if (err.code === 3) message = "Waktu permintaan lokasi habis.";

        setError(message);
        setStatus("error");
        showCustomToast({ message, type: "error", duration: 7000 });
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((permissionStatus) => {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === "granted") {
              getCurrentLocation();
            }
          };
        })
        .catch(() => {
          // Fallback: jika permission API gagal
          console.warn("Tidak dapat memeriksa status permission geolocation.");
        });
    }
  }, []);

  return { location, error, status };
}