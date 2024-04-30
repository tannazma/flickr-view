import { Picture } from "../types";
import { PhotoCard } from "./PhotoCard";

interface PhotoCardProp {
  pictures: Picture[];
}
export const PhotoGrid = ({ pictures }: PhotoCardProp) => {
  return (
    <div className={"flex flex-wrap justify-around p-7 gap-5"}>
      {pictures.map((pic, index) => (
        <PhotoCard key={index} pic={pic} showOnlyTags={false} />
      ))}
    </div>
  );
};
