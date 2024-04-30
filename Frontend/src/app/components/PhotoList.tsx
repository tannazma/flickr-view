import { Picture } from "../types";
import { PhotoListItem } from "./PhotoListItem";

interface PhotoListProp {
  pictures: Picture[];
}

export const PhotoList = ({ pictures }: PhotoListProp) => {
  return (
    <div className={"flex flex-col justify-around p-7 gap-5"}>
      {pictures.map((pic, index) => (
        <PhotoListItem key={index} pic={pic} />
      ))}
    </div>
  );
};
