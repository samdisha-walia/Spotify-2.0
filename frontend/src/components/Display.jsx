import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import PlaylistPage from "./PlaylistPage/PlaylistPage"; // ✅ Create this
import Search from "./Search/Search";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const [bgColor, setBgColor] = useState("#121212");
  const [playlistData, setPlaylistData] = useState(null);

  const isPlaylist = location.pathname.includes("/playlist/");
  const isSearch = location.pathname.includes("/search");
  const playlistId = isPlaylist ? location.pathname.split("/").pop() : "";

  useEffect(() => {
    if (isPlaylist) {
      // ✅ Fetch playlist data for background and rendering
      fetch(`http://localhost:5000/api/playlist/${playlistId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPlaylistData(data.playlist);
            const randomColor = generateRandomColor(); // For variety
            setBgColor(`linear-gradient(${randomColor}, #121212)`);
          }
        })
        .catch((err) => {
          console.error("Playlist fetch error:", err);
          setPlaylistData(null);
        });
    } else {
      setPlaylistData(null);
      setBgColor("#121212");
    }
  }, [playlistId]);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = bgColor;
    }
  }, [bgColor]);

  const generateRandomColor = () => {
    const colors = ["#FF5F6D", "#FFC371", "#43C6AC", "#6A82FB", "#FC466B"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {isSearch && <Search />}
      {isPlaylist && <PlaylistPage playlistData={playlistData} />}
      {!isPlaylist && !isSearch && <Home />}
    </div>
  );
};

export default Display;
