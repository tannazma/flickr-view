"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [pictures, setPictures] = useState<Pictures[]>([]);

  useEffect(() => {
    const getPictures = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/photos");
        const data = await response.json();
        console.log(data);
        setPictures(data);
        if (!response.ok) {
          throw new Error("Failed to fecth pictures");
        }
      } catch (error) {
        console.log("Error fetching pictures", error);
      }
    };
    getPictures();
  }, []);

  return (
    <div className="flex flex-wrap justify-around p-7 gap-3 origin-top-left">
      {pictures.map((pic, index) => {
        const date = new Date(pic.published);
        const formattedDate = `${date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })} at ${date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}`;

        return (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm w-72"
          >
            <div className="relative w-full h-48">
              <Image
                src={pic.imageURL}
                alt={pic.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg overflow-hidden"
              />
            </div>
            <div className="p-2">
              <h3 className="text-lg font-semibold overflow-hidden">
                {pic.title}
              </h3>
              <div className="text-sm text-gray-600 overflow-hidden line-clamp-4">
                <strong>Author: </strong>
                {pic.author.match(/"([^"]*)"/)?.[1] || "No author found"}
              </div>
              <div>
                <strong className="text-sm text-gray-500">Published: </strong>
                <span className="text-sm text-gray-500">{formattedDate}</span>
              </div>
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
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              )}
              <a
                href={pic.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-600 hover:text-blue-800 hover:underline"
              >
                View on Flickr
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
