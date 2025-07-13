import React from "react";
import Layout from "../../Layout/Layout";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Context";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { Link } from "react-router-dom";

import ArijitImage from "../../assets/Arijit.jpeg";

const Search = () => {
  const { filteredSongs } = useGlobalContext();
  return (
    <>
      <Navbar />
      <Layout>
      <div className="tertiary-bg mx-4 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Browse All
          </span>
        </div>
        {filteredSongs?.length <= 0 && (
          <div className="grid  gap-6 grid-cols-5">
            <div className="col-span-1">
              <CategoryCard
                title={"Live Events"}
                img={ArijitImage}
                color={"bg-purple-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"Made For You"}
                img={ArijitImage}
                color={"bg-red-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"New Releases"}
                img={ArijitImage}
                color={"bg-orange-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"Live Events"}
                img={ArijitImage}
                color={"bg-purple-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"Live Events"}
                img={ArijitImage}
                color={"bg-purple-500"}
              />
            </div>
          </div>
        )}
        {filteredSongs?.length > 0 && (
          <div className="grid  gap-6 grid-cols-5">
            {filteredSongs.map((song) => {
              return <Card key={song.id} song={song} />;
            })}
          </div>
        )}
      </div>
      <SongBar />
    </Layout>
    </>
  );
};

const CategoryCard = ({ title, img, color }) => {
  return (
    <div
      className={`p-4 rounded-lg w-full  ${color} relative overflow-hidden h-56`}
    >
      <span className="text-xl font-semibold mt-2">{title}</span>
      <img
        src={img}
        alt=""
        className="w-1/2 h-1/2 absolute bottom-0 -right-8 rotate-45 object-cover"
      />
    </div>
  );
};
export default Search;
