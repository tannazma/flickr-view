import Image from "next/image";
import { Picture } from "../types";

type Props = {
  pic: Picture;
  showOnlyTags: boolean;
};

export function PhotoCard({ pic, showOnlyTags = false }: Props) {
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
      key={pic.title}
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
        {showOnlyTags ? (
          <></>
        ) : (
          <>
            <h3 className="text-lg font-semibold overflow-hidden">
              {pic.title.length<70 ? pic.title.slice(0,70):  pic.title.slice(0,70 )+ "..."}
            </h3>
            <div className="text-sm text-gray-600 overflow-hidden line-clamp-4">
              <strong>Author: </strong>
              {pic.author.match(/"([^"]*)"/)?.[1] || "No author found"}
            </div>
            <div>
              <strong className="text-sm text-gray-500">Published: </strong>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </>
        )}
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
                    <a href={`http://localhost:3001/?tags=${tag}`}>
                      {tag.trim()}
                    </a>
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
}
