export async function fetchCoordsFromNominatim(query: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
    { headers: { "User-Agent": "GeoWeatherApp/1.0" } }
  );
  if (!res.ok) throw new Error("Gagal mengambil koordinat dari Nominatim");
  const data = await res.json();
  if (!data.length) throw new Error("Lokasi tidak ditemukan");
  const { lat, lon, display_name } = data[0];
  return { lat: parseFloat(lat), lon: parseFloat(lon), name: display_name };
}