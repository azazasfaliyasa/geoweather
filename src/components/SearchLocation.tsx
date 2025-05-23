"use client";

import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchLocation({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="Cari lokasi (nama kota atau alamat)"
        className="flex-grow border rounded px-3 py-2 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Cari
      </button>
    </form>
  );
}