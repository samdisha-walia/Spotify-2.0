import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playSong, pauseSong } from "../../states/Actors/SongActor";
import Navbar from "../Navbar"; // Adjust if needed
import "./PlaylistPage.css";
import Layout from "../../Layout/Layout";
import { useGlobalContext } from "../../states/Context";
import SongBar from "../MasterBar/SongBar";


const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const dispatch = useDispatch();
  const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
  const [bgColor, setBgColor] = useState("#121212");
  const { setCurrentPlaylist,  } = useGlobalContext();

    const displayRef = useRef();


    const generateRandomColor = () => {
        const colors = ["#FF5F6D", "#FFC371", "#43C6AC", "#6A82FB", "#FC466B"];
        return colors[Math.floor(Math.random() * colors.length)];
        };


  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/playlist/${id}`);
        const data = await res.json();
        if (data.success) {
            setPlaylist(data.playlist);
            setCurrentPlaylist(data.playlist.songs); // 👈 This is key
            setBgColor(`linear-gradient(${generateRandomColor()}, #121212)`);
            
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [id]);

  useEffect(() => {
    if (displayRef.current) {
        displayRef.current.style.background = bgColor;
    }
    }, [bgColor]);


  const handlePlay = (song) => {
    const formattedSong = {
      id: song._id || song.id,
      title: song.song_title || song.title,
      artist: song.song_artist || song.artist,
      mp3: song.song_mp3, // Already absolute URL
      img: song.song_thumbnail,
    };

    if (masterSong.id === formattedSong.id && isPlaying) {
      dispatch(pauseSong());
    } else {
      dispatch(playSong(formattedSong));
    }
  };

  if (!playlist) return <div className="text-white p-6">Loading...</div>;


  const getSongId = (s) => s?._id || s?.id;


  return (
    <>
      <Navbar />
      <Layout>
      <div className="p-6 flex flex-col md:flex-row items-center md:items-end gap-6 text-white">
        <img
          src={playlist.songs[0]?.song_thumbnail }
          alt="Playlist cover"
          className="w-48 h-48 object-cover rounded shadow-lg"
        />
        <div>
          <p className="uppercase text-sm font-medium mb-1">Playlist</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">{playlist.title}</h1>
          <p className="text-gray-200 mb-3">Created by User</p>
          <p className="text-sm text-gray-300">
            {playlist.songs.length} Songs • approx {playlist.songs.length * 3} mins
          </p>
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] text-sm">
        <p><b className="mr-4">#</b>Title</p>
        <p>Artist</p>
        <p className="hidden sm:block">Added</p>
        <div className="flex justify-center items-center">⏱</div>
      </div>
      <hr className="border-gray-700 my-2" />

      {/* Songs List */}
      {playlist.songs.map((song, index) => (
        <div
          key={index}
          onClick={() => handlePlay(song)}
          className={`grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center 
            ${
                getSongId(masterSong) === getSongId(song) && isPlaying
                  ? "bg-green-600/20"
                  : "hover:bg-white/10"
              }

            text-[#a7a7a7] cursor-pointer rounded`}
        >
          <div className="flex items-center gap-4">
            <p className="w-6 text-right">{index + 1}</p>
            <img
              className="w-10 h-10 rounded object-cover"
              src={song.song_thumbnail }
              alt={song.song_title}
            />
            <p className="text-white text-sm truncate">{song.song_title || song.title || "Unknown Title"}</p>
          </div>
          <p>{song.song_artist || song.artist || "Unknown Artist"}</p>
          <p className="hidden sm:block">Recently</p>
          <p className="text-center">3:30</p>
        </div>
      ))}
       <SongBar />
      </Layout>
    </>
  );
};

export default PlaylistPage;
