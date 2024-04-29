"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Picture } from "./types";
import { PhotoCard } from "./components/PhotoCard";

export default function Home() {
  // Define tagsFromUrl as adefault state for query
  const [query, setQuery] = useState("");
  const [pictures, setPictures] = useState<Picture[]>([]);
  const router = useRouter();

  // Use Suspense to handle asynchronous loading with useSearchParams
  const TagsSearch = () => {
    const searchParams = useSearchParams();
    // Get tags from url using useSearhcParams()
    const tagsFromUrl = searchParams.get("tags");

    useEffect(() => {
      if (tagsFromUrl) setQuery(tagsFromUrl);
    }, [tagsFromUrl]);

    return null; // This component does not render anything
  };

  const getPictures = useCallback(async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVERURL;
    console.log("Base URL:", baseUrl);
    if (!process.env.NEXT_PUBLIC_SERVERURL) {
      console.error("NEXT_PUBLIC_SERVERURL is not set.");
      throw new Error("Application configuration error: NEXT_PUBLIC_SERVERURL is required.");
    }
    try {
      const response = await fetch(
        `${baseUrl}/photos/?tags=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setPictures(data);
      if (!response.ok) {
        throw new Error("Failed to fecth pictures");
      }
    } catch (error) {
      console.log("Error fetching pictures", error);
    }
  }, [query]);

  useEffect(() => {
    getPictures();
  }, [getPictures]);
  const handleSearchTags = async () => {
    // Push router/url to the tag query + get the pictures
    router.push(`/?tags=${query}`);
    getPictures();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TagsSearch />
      <div>
        <div className="relative flex align-middle text-center justify-center">
          {/* use form with button type submit to make the search work with enter */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchTags();
            }}
          >
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 text-gray-900 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search by tags"
              onChange={(event) => setQuery(event.target.value)}
              // Bind input value to the query
              value={query}
            />
            <button
              type="submit"
              className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex flex-wrap justify-around p-7 gap-2 ">
          {pictures.map((pic, index) => (
            <PhotoCard key={index} pic={pic} showOnlyTags={false} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
