import React from "react";

const data = [
  {
    id: 1,
    imageUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    name: "Item 1",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
    name: "Item 2",
  },
  {
    id: 1,
    imageUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    name: "Item 1",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
    name: "Item 2",
  },
  {
    id: 1,
    imageUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    name: "Item 1",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
    name: "Item 2",
  },
  {
    id: 1,
    imageUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    name: "Item 1",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
    name: "Item 2",
  },
  {
    id: 1,
    imageUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    name: "Item 1",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
    name: "Item 2",
  },
  {
    id: 1,
    imageUrl:
      "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    name: "Item 1",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
    name: "Item 2",
  },
];

const HomeScreen = () => {
  return (
    <div className="flex flex-1 min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col w-full mx-auto">
        <div className=" py-3 px-4 md:px-14">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {data.map((item) => (
            <div key={item.id} className="flex items-center justify-center">
              <div className="h-48 w-48 md:h-64 md:w-64 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
