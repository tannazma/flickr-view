"use client";

import { useState } from "react";
import Image from "next/image";
import PhotoCards from "./components/PhotoCard";

type Pictures = {
  title: string;
  imageURL: string;
  author: string;
  link: string;
  description: string;
  tags: string;
  published: string;
};
export default function Home() {
  const [query, setQuery] = useState("");
  const [pictures, setPictures] = useState<Pictures[]>([]);
  const [filteredPictures, setFilteredPictures] = useState(false);

  const handleSearchTags = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/photos?tags=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const filteredData = query
        ? data.filter((pic: Pictures) => pic.tags.split(" ").includes(query))
        : data;
      setPictures(filteredData);
      setFilteredPictures(true);
    } catch (error) {
      console.log("Error fetching pictures", error);
    }
  };
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
        {filteredPictures &&
          pictures
            .filter((item) =>
              item.tags.toLowerCase().includes(query.toLowerCase())
            )
            .map((pic, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm w-72"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={pic.imageURL}
                    alt={pic.title}
                    layout="fill"
                    sizes="(max-width: 768px) 100vw"
                    objectFit="cover"
                    className="rounded-t-lg overflow-hidden"
                  />
                </div>
                <div className="p-2">
                  {pic.tags && (
                    <div className="text-sm text-gray-500">
                      <strong>Tags: </strong>
                      <div>
                        {pic.tags
                          .split(" ")
                          .slice(0, 4)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="p-1 m-1 inline-block bg-gray-200 rounded overflow-hidden"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>
      {filteredPictures || <PhotoCards photos={pictures} />}
    </div>
  );
}
