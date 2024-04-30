import { Picture } from "../types";

type Props = {
  pic: Picture;
};

export const PhotoListItem = ({ pic }: Props) => {
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
    <div className={"flex flex-row gap-3"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="relative h-40">
        <img
          src={pic.imageURL}
          alt={pic.title}
          className="w-[160px] h-[160px] object-contain"
          loading="lazy"
          width={160}
          height={160}
        />
      </div>
      <div
        key={pic.title}
        className={`w-full p-2 flex flex-col justify-between border border-gray-300 rounded-lg shadow-sm relative`}
      >
        <div>
          <div className="">
            <div>
              <div>
                <h3 className="text-sm text-gray-800 font-semibold mb-2 truncate">
                  {pic.title.length < 70
                    ? pic.title.slice(0, 70)
                    : pic.title.slice(0, 70) + "..."}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Author: </strong>
                  {pic.author.match(/"([^"]*)"/)?.[1] || "No author found"}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong className="text-sm text-gray-500">Published: </strong>
                  <span className="text-sm text-gray-500">{formattedDate}</span>
                </div>
              </div>
              {pic.tags && (
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Tags: </strong>
                  <div className="flex flex-wrap mt-1">
                    {pic.tags
                      .split(" ")
                      .slice(0, 4)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="mr-1 mb-1 p-1 bg-gray-200 rounded text-xs  hover:bg-violet-400 hover:text-white"
                        >
                          <a href={`/?tags=${tag}`}>{tag.trim()}</a>
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
              <div className="flex">
                <a
                  href={pic.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-3 py-1 bg-violet-400 rounded text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-violet-600"
                >
                  View on Flickr
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
