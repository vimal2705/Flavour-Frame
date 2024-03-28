import { upload } from "@testing-library/user-event/dist/upload";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { common } from "../config/call";
import CardItem from "../components/CardItem";
import CloseIcon from "@mui/icons-material/Close";

const HomeScreen = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const fetchListing = () => {
    common.getListing().then(({ data }) => {
      console.log("asdasd",data);
      setData(data.data);
    });
  };

  const onGenerate = (param) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
      const formData = new FormData();
      const key = typeof param === "string" ? "prompt" : "image";
      formData.append(key, param);

      common.generateImage(formData).then(fetchListing);
    }
  };

  const onUpload = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } else {
      const input = document.getElementById("file-input");
      input.click();
    }
  };

  useEffect(() => {
    fetchListing();
  }, [location]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setSearchValue(selectedImage);
  };

  return (
    <div className=" bg-black h-screen pt-[100px] max-h-[100vh] overflow-auto">
      <div>
        <div class="d-flex p-3 bg-neutral-10 max-sm:flex-col gap-2 rounded mx-[5%] lg:mx-[20%]">
          <div className="flex flex-1 items-center">
            <input
              type="text"
              value={
                typeof searchValue === "string" ? searchValue : searchValue.name
              }
              disabled={typeof searchValue !== "string"}
              onChange={(e) => setSearchValue(e.target.value)}
              class="form-control newsletter-1__input bg-transparent clr-neutral-60"
              placeholder="An Astronaut riding a horse on mars, hd"
            />
            {searchValue && (
              <div
                className="text-white cursor-pointer"
                onClick={() => setSearchValue("")}
              >
                <CloseIcon />
              </div>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            id="file-input"
          />
          <div className="flex gap-0.5 max;sm:flex-1">
            <button
              type="button"
              onClick={onUpload}
              class="newsletter-1__btn flex-1 mr-4 d-inline-block py-3 px-5 rounded fw-bold clr-white bg-grad-1"
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => onGenerate(searchValue)}
              class="newsletter-1__btn flex-1 d-inline-block py-3 px-5 rounded fw-bold clr-white bg-grad-1"
            >
              Generate
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-[5%] my-4 ">
          {data?.map((item,i) => (
            <div
            key={i}
              className="bg-white relative rounded-2xl overflow-hidden aspect-square"
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

export default HomeScreen;
