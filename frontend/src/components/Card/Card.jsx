import React,{ useState } from "react";
import "./Card.css";
import { FaPause,FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { pauseSong, playSong } from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Context";
import cardImg from '../../assets/card.png';
import ArijitImage from "../../assets/Arijit.jpeg";
import AuthModal from "../AuthModal";



const Card = ({song, idx ,isAuthenticated, setShowModal,setSelectedSong  }) => {
    if (!song) return null;
    
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
    const {resetEverything,setSongIdx, setCurrentPlaylist } = useGlobalContext();
    const dispatch = useDispatch();
/*
    const handlePlay = (song) => {
        if (!isAuthenticated) {
            setSelectedSong (song);
            setShowModal(true);
            return;
            }
        console.log("playing");
        setSongIdx(idx)
        console.log(idx)
        if (isPlaying) {
            masterSong.mp3.currentTime = 0;
            masterSong.mp3.pause();
            resetEverything();
        }
        dispatch(playSong(song));
    };
    const handlePause = () => {
        dispatch(pauseSong());
    };*/

    const handlePlay = (song) => {
        if (!isAuthenticated) {
            setSelectedSong(song);
            setShowModal(true);
            return;
        }

        console.log("playing");
        setSongIdx(idx);
        console.log(idx);

        // Don't manually pause/reset audio here — just reset context state
        resetEverything();

        // Dispatch the selected song; SongBar will handle playback logic
        dispatch(playSong(song));

        setCurrentPlaylist([song]);
        

    };

    const handlePause = () => {
            dispatch(pauseSong());
        };

    return (
        song && (
        <div className="secondary-bg  rounded-lg">
        <div className="card col-span-1 p-4 rounded-lg">
            <div className="relative overflow-hidden rounded-lg">
                <img src={song.img} className="h-40 w-full object-cover rounded-lg" alt="no image" />
                {masterSong.id === song.id && isPlaying ? (
                    <button
                        onClick={handlePause}
                        className="play_btn"
                    >
                        <FaPause className="text-black text-xl" />
                    </button>
                ) : (
                    <button
                        onClick={() => handlePlay(song)}
                        className="play_btn">
                        <FaPlay className="text-black text-xl" />
                    </button>
                )}
            </div>

            <h3 className="text-sm font-semibold my-2">{song.artist}</h3>
                <p className="text-xs text-gray-400 leading-4">
                    {song.title} - {song.artist}
                </p>
        </div>
        </div>
        )
    );
};

export default Card;
