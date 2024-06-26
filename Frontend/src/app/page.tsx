"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Picture } from "./types";
import { PhotoGrid } from "./components/PhotoGrid";
import { PhotoList } from "./components/PhotoList";

export default function Home() {
  return (
    // Use Suspense to handle asynchronous loading with useSearchParams
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponent />
    </Suspense>
  );
}

const HomeComponent = () => {
  // Define tagsFromUrl as adefault state for query
  const searchParams = useSearchParams();
  // Get tags from url using useSearhcParams()
  const tagsFromUrl = searchParams.get("tags");
  const [query, setQuery] = useState(tagsFromUrl ?? "");
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isListView, setIsListView] = useState(false);
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const getPictures = useCallback(async () => {
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not set.");
      throw new Error(
        "Application configuration error: NEXT_PUBLIC_BACKEND_URL is required."
      );
    }
    try {
      const response = await fetch(
        `${baseUrl}/?tags=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setPictures(data);
      if (!response.ok) {
        throw new Error("Failed to fecth pictures");
      }
    } catch (error) {
      console.log("Error fetching pictures", error);
    }
  }, [query, baseUrl]);

  useEffect(() => {
    getPictures();
  }, [getPictures]);

  const handleSearchTags = async () => {
    // Push router/url to the tag query + get the pictures
    router.push(`/?tags=${query}`);
    await getPictures();
  };

  const toggleView = () => {
    setIsListView(!isListView); // Toggle list view state
  };
  return (
    <div>
      <div className="relative flex align-middle text-center justify-center flex-wrap p-3 m-3">
        {/* use form with button type submit to make the search work with enter */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchTags();
          }}
        >
          <div className="relative mt-4">
            <input
              type="text"
              className="w-full pl-4 px-9 py-1 border pr-20 border-gray-300 rounded-lg text-sm placeholder-gray-500 text-gray-900 bg-gray-50 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder=" 🔍   Search by tag"
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
            <button
              type="submit"
              className="text-sm absolute inset-y-0 right-0 flex items-center justify-center px-3 bg-violet-500 text-white rounded-r-lg hover:bg-violet-600"
            >
              Search
            </button>
          </div>
        </form>
        <div className="absolute top-8 right-3">
          {/* Button to toggle list/grid view */}
          <button
            onClick={toggleView}
            className="text-sm ml-2 p-2 bg-violet-200 text-white rounded-lg hover:bg-violet-600"
          >
            {isListView ? (
              <img src="./grid.png" width={14} height={14} />
            ) : (
              <img src="./list.png" width={14} height={14} />
            )}
          </button>
        </div>
      </div>
      {isListView ? (
        <PhotoList pictures={pictures} />
      ) : (
        <PhotoGrid pictures={pictures} />
      )}
    </div>
  );
};
