import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { common } from "../config/call";
import CardItem from "../components/CardItem";

const KeywordScreen = () => {
  const [data, setData] = useState([]);
  console.log("🚀 - KeywordScreen - data:", data);
  const [searchValue, setSearchValue] = useState("Pizza");
  const navigate = useNavigate();

  const onGenerate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
      const formData = new FormData();
      formData.append("prompt", searchValue);

      common.generateImage(formData).then(({ data }) => {
        setData(data.data);
      });
    }
  };

  return (
    <div className=" bg-black h-screen pt-[100px] max-h-[100vh] overflow-auto">
      <div>
        <div class="d-flex p-3 bg-neutral-10 rounded mx-[20%]">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            class="form-control newsletter-1__input bg-transparent clr-neutral-60"
            placeholder="Enter keyword"
          />
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            id="file-input"
          />

          <button
            type="button"
            onClick={onGenerate}
            class="newsletter-1__btn d-inline-block py-3 px-5 rounded fw-bold clr-white bg-grad-1"
          >
            Generate
          </button>
        </div>
        <div className="grid grid-cols-5 gap-5 px-[5%] my-4 ">
          {data.imageData?.[0]?.imagineData.map((item,i) => (
            <div
            key={i}
              className="bg-white relative rounded-2xl p-2 overflow-hidden aspect-square"
              onClick={() => navigate("/detail", { state: { id: item.id } })}
            >
              <CardItem data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordScreen;
