# 🌤️ GeoWeather App

GeoWeather adalah aplikasi web yang menampilkan **cuaca saat ini** berdasarkan lokasi pengguna secara otomatis menggunakan **Geolocation API** serta pencarian lokasi manual. Data cuaca diambil dari **WeatherAPI**, dan peta lokasi ditampilkan menggunakan **Leaflet.js + OpenStreetMap**.

Dibangun menggunakan [Next.js App Router](https://nextjs.org/docs/app) dengan Tailwind CSS untuk styling, serta deploy-ready di Vercel.

---

## 🚀 Demo Live

🌐 [https://geoweather-woad.vercel.app/](https://geoweather-woad.vercel.app/)

---

## ✨ Fitur Utama

- 🌍 Deteksi lokasi otomatis via **Geolocation API**
- 🔍 Cari cuaca berdasarkan kota atau negara
- 🗺️ Tampilkan lokasi di **Leaflet Map** (OpenStreetMap)
- 🌤️ Informasi cuaca real-time:
  - Suhu, kondisi langit, kecepatan angin, kelembapan
  - Ikon cuaca dan waktu lokal
- 🎯 Koordinat Latitude & Longitude
- 💡 UI responsif dan ringan

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Map**: Leaflet.js + OpenStreetMap
- **API**: [WeatherAPI.com](https://www.weatherapi.com/)
- **Deployment**: Vercel

---

## 📦 Instalasi Lokal

### 1. Clone project
```bash
git clone https://github.com/azazasfaliyasa/geoweather.git
cd geoweather
```

### 2. Install dependencies
```bash
npm install
# atau
yarn install
```

### 3. Buat file `.env.local`
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weatherapi_key
```
> Dapatkan API key gratis dari: [https://www.weatherapi.com/](https://www.weatherapi.com/)

### 4. Jalankan development server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 🚀 Deploy ke Vercel

Aplikasi ini siap dideploy ke Vercel secara langsung. Langkah:

1. Push project ke GitHub
2. Buka [https://vercel.com/new](https://vercel.com/new)
3. Import repository kamu
4. Tambahkan environment variable:
   - `NEXT_PUBLIC_WEATHER_API_KEY`
5. Klik **Deploy**

---

## 📸 Preview

<img src="public/preview.jpg" alt="Preview App" width="100%" />

---

## 🧑‍💻 Kontributor

Made with ❤️ by [Azaz Asfali Yasa](https://github.com/azazasfaliyasa)

---

## 📄 License

MIT License. Bebas digunakan dan dimodifikasi untuk keperluan pribadi maupun komersial.