"use client";

import { useEffect, useState } from "react";
import { Picture } from "./types";
import { PhotoCard } from "./components/PhotoCard";

export default function Home() {
  const [pictures, setPictures] = useState<Picture[]>([]);

  const getPictures = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/photos?tags=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setPictures(data);
      if (!response.ok) {
        throw new Error("Failed to fecth pictures");
      }
    } catch (error) {
      console.log("Error fetching pictures", error);
    }
  };

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <div>
      <div className="relative flex align-middle text-center justify-center">
        <input
          type="text"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 text-gray-900 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search by tags"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          onClick={handleSearchTags}
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-around p-7 gap-3 origin-top-left">
        {pictures.map((pic, index) => (
          <PhotoCard key={index} pic={pic} showOnlyTags={false} />
            ))}
      </div>
      {filteredPictures || <PhotoCards photos={pictures} />}
    </div>
  );
}
