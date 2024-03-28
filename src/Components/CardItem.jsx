import { useState } from "react";
import loading from "../assets/Loading.gif";

const CardItem = ({ data }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const ImgUrl = data?.url?.includes('/')
  ? "http://images.iykyknow.ai/".replace('imagine/', '') + data.url
  : "http://images.iykyknow.ai/" + data.url;
  return (
    <>
      {data?.imagine_status === "pending" || data.url === null? (
        <div className="h-full w-full flex justify-center items-center">
          <img src={loading} className="h-[200px] w-[200px]" />
        </div>
      ) : (
        <div className="h-full w-full flex">
        <img
          src={ImgUrl}
          className="h-full w-full absolute"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        </div>
      )}
      <div className="absolute bottom-[10px] h-[35px] w-[35px] right-[10px] flex justify-center items-center bg-black text-white p-2 rounded-full">
        {data.image_count}
      </div>
    </>
  );
};

export default CardItem;
