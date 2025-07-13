import React, { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AiOutlineHeart, AiOutlinePlaySquare } from "react-icons/ai";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { CgScreen } from "react-icons/cg";
import { BiRepeat, BiShuffle } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiMicrophoneStageDuotone, PiQueueLight } from "react-icons/pi";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { BsArrowsAngleContract, BsSpeakerFill } from "react-icons/bs";
import { pauseMaster, playMaster,playSong, } from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Context";
import "./SongBar.css";
import { songs_mp } from "../../data/songs_mp";
//import { songs } from "../Home/Home";

import { toast } from "react-toastify";


const SongBar = () => {
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
    const {
        progress,
        setProgress,
        resetEverything,
        songIdx,
        setSongIdx,
        currTime,
        setCurrTime,
        duration,
        setDuration,
        currentPlaylist,
    } = useGlobalContext();
    const dispatch = useDispatch();
    const [volume, setVolume] = useState(50);
    const audioRef = useRef(null);


    const handleMaster = () => {
        if (isPlaying) {
            dispatch(pauseMaster());
        } else {
            dispatch(playMaster());
        }
    };

    const formatTime = (secs) => {
        if (!secs || isNaN(secs)) return "00:00";
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };


    useEffect(() => {
        if (!masterSong?.mp3) {
            toast.error("Audio file not found");
            return;
        }

        const audio = new Audio(masterSong.mp3); // ✅ force rebuild
        audioRef.current = audio;
        audio.volume = volume / 100;
        
        //const audio = audioRef.current;
       // audioRef.current.volume = volume / 100;

       

        const onLoadedMetadata = () => {
            setDuration(formatTime(audio.duration));
        };

        const onTimeUpdate = () => {
            const current = audio.currentTime;
            const total = audio.duration || 0;
            setProgress((current / total) * 100);
            setCurrTime(formatTime(current));
        };

        const onEnded = () => {
            dispatch(pauseMaster());
            resetEverything();
        };

        audio.addEventListener("loadedmetadata", onLoadedMetadata);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);

        if (isPlaying) {
            audio.play().catch((err) => {
            console.error("Playback error:", err);
        });
    } else audio.pause();

        return () => {
            audio.pause();
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
        };
    }, [masterSong, isPlaying]);

    const changeProgress = (e) => {
        const newProgress = e.target.value;
        if (!audioRef.current) return;
        const seekTime = (newProgress / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setProgress(newProgress);
    };

    const changeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume / 100;
    };

    const addToLiked = async (song) => {
        const rawUser = localStorage.getItem("user");
        const user = rawUser ? JSON.parse(rawUser) : null;

        if (!user || !user._id) {
        alert("Please log in to like songs.");
        return;
        }

        try {
        const res = await fetch("http://localhost:5000/api/playlist/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            song_mp3: song.mp3,
            song_title: song.title || song.song_title,
            song_artist: song.artist || song.song_artist,
            song_thumbnail: song.img,
            userId: user._id,
            }),
        });
        const data = await res.json();
        console.log(data);
        } catch (err) {
        console.error("Error adding to liked songs:", err);
        }
    };

    const backwardSong = () => {
        if (songIdx > 0) {
        const newIdx = songIdx - 1;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        resetEverything();
        setSongIdx(newIdx);
        dispatch(playSong(songs_mp[newIdx])|| currentPlaylist[newIdx]);
        dispatch(playMaster());
        }
    };

    const forwardSong = () => {
        const nextIndex = songIdx + 1;
        if (nextIndex < songs_mp.length || nextIndex < currentPlaylist.length) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        resetEverything();
        setSongIdx(nextIndex);
        dispatch(playSong(songs_mp[nextIndex])|| currentPlaylist[nextIndex]);
        dispatch(playMaster());
        }
    };
    const mouseEnter = () => {
            document.querySelector(".active_progress").style.background = "green";
        };
    const mouseLeave = () => {
        document.querySelector(".active_progress").style.background = "#fff";
    };
    const enterVolume = () => {
        document.querySelector("#volume").style.background = "green";
    };
    const leaveVolume = () => {
        document.querySelector("#volume").style.background = "#fff";
    };


    

    return (
        <div className="fixed w-full flex items-center justify-between bottom-0 left-0 h-20 bg-black">
            <div className="w-2/12">
                <div className="flex-[2] flex items-center gap-2">
                    <img src={masterSong?.img } alt="song" className="h-12 w-12 object-cover rounded" />

                    <div>
                        <h3 className="text-sm font-semibold">
                            {masterSong?.title || masterSong?.song_title || "Unknown Title"}
                        </h3>
                        <span className="text-xs text-gray-400">
                            {masterSong?.artist || masterSong?.song_artist || "Unknown Name"}
                        </span>
                    </div>
                    <AiOutlineHeart  onClick={() => addToLiked(masterSong)}  className="ml-3 cursor-pointer hover:text-green-400"  />
                    <CgScreen className="ml-3" />
                </div>
            </div>
            <div className="flex-[5] flex flex-col items-center">
                <div className="flex justify-center items-center mb-2 gap-6 text-2xl">
                    <BiShuffle />
                    <IoMdSkipBackward onClick={backwardSong} />
                        {isPlaying ? (
                            <button
                                onClick={handleMaster}
                                className="w-10 h-10 flex items-center rounded-full bg-white justify-center p-2"
                            >
                                <FaPause className="text-black text-lg" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleMaster}
                                    className="w-10 h-10 flex items-center rounded-full bg-white justify-center p-2"
                                >
                                <FaPlay className="text-black text-lg" />
                        </button>
                      )}
                   
                    <IoMdSkipForward onClick={forwardSong}/>
                    <BiRepeat />
                </div>
                <div className="flex items-center gap-2 w-full max-w-xl">
                    <span className="text-xs w-12 text-right">{currTime}</span>
                    <div className="relative w-full flex items-center">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={progress}
                            disabled={!masterSong.mp3}
                            onChange={changeProgress}
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                            className="flex-grow accent-blue-500" 
                            
                        />{/*"w-full block"*/}
                        <div
                            className="active_progress"
                            style={{ width: `${progress}%` }}
                        ></div>

                    </div>
                    <span className="text-xs w-12">{duration}</span>
                </div>
            </div>
            <div className="flex-[2] flex items-center gap-4 justify-end pr-4 text-xl">
                <AiOutlinePlaySquare className="text-2xl" />
                <PiMicrophoneStageDuotone className="text-2xl" />
                <PiQueueLight className="text-2xl" />
                <BsSpeakerFill className="text-2xl" />
                {volume <= 0 && <HiSpeakerXMark className="text-2xl" />}
                {volume > 0 && <HiSpeakerWave className="text-2xl" />}

                {/* <HiSpeakerXMark className="text-2xl" /> */}
                <div className="relative w-full flex items-center">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        onMouseEnter={enterVolume}
                        onMouseLeave={leaveVolume}
                        value={volume}
                        disabled={!masterSong.mp3}
                        onChange={changeVolume}
                        className="w-full block"
                    />
                    <div
                        id="volume"
                        className={`active_progress w-[${volume}%]`}
                    ></div>
                </div>
                <BsArrowsAngleContract className="text-2xl"/>
            </div>
            <div className="hidden">
                <div className="w-[1%]"></div>
                <div className="w-[2%]"></div>
                <div className="w-[3%]"></div>
                <div className="w-[4%]"></div>
                <div className="w-[5%]"></div>
                <div className="w-[6%]"></div>
                <div className="w-[7%]"></div>
                <div className="w-[8%]"></div>
                <div className="w-[9%]"></div>
                <div className="w-[10%]"></div>
                <div className="w-[11%]"></div>
                <div className="w-[12%]"></div>
                <div className="w-[13%]"></div>
                <div className="w-[14%]"></div>
                <div className="w-[15%]"></div>
                <div className="w-[16%]"></div>
                <div className="w-[17%]"></div>
                <div className="w-[18%]"></div>
                <div className="w-[19%]"></div>
                <div className="w-[20%]"></div>
                <div className="w-[21%]"></div>
                <div className="w-[22%]"></div>
                <div className="w-[23%]"></div>
                <div className="w-[24%]"></div>
                <div className="w-[25%]"></div>
                <div className="w-[26%]"></div>
                <div className="w-[27%]"></div>
                <div className="w-[28%]"></div>
                <div className="w-[29%]"></div>
                <div className="w-[30%]"></div>
                <div className="w-[31%]"></div>
                <div className="w-[32%]"></div>
                <div className="w-[33%]"></div>
                <div className="w-[34%]"></div>
                <div className="w-[35%]"></div>
                <div className="w-[36%]"></div>
                <div className="w-[37%]"></div>
                <div className="w-[38%]"></div>
                <div className="w-[39%]"></div>
                <div className="w-[40%]"></div>
                <div className="w-[41%]"></div>
                <div className="w-[42%]"></div>
                <div className="w-[43%]"></div>
                <div className="w-[44%]"></div>
                <div className="w-[45%]"></div>
                <div className="w-[46%]"></div>
                <div className="w-[47%]"></div>
                <div className="w-[48%]"></div>
                <div className="w-[49%]"></div>
                <div className="w-[50%]"></div>
                <div className="w-[51%]"></div>
                <div className="w-[52%]"></div>
                <div className="w-[53%]"></div>
                <div className="w-[54%]"></div>
                <div className="w-[55%]"></div>
                <div className="w-[56%]"></div>
                <div className="w-[57%]"></div>
                <div className="w-[58%]"></div>
                <div className="w-[59%]"></div>
                <div className="w-[60%]"></div>
                <div className="w-[61%]"></div>
                <div className="w-[62%]"></div>
                <div className="w-[63%]"></div>
                <div className="w-[64%]"></div>
                <div className="w-[65%]"></div>
                <div className="w-[66%]"></div>
                <div className="w-[67%]"></div>
                <div className="w-[68%]"></div>
                <div className="w-[69%]"></div>
                <div className="w-[70%]"></div>
                <div className="w-[71%]"></div>
                <div className="w-[72%]"></div>
                <div className="w-[73%]"></div>
                <div className="w-[74%]"></div>
                <div className="w-[75%]"></div>
                <div className="w-[76%]"></div>
                <div className="w-[77%]"></div>
                <div className="w-[78%]"></div>
                <div className="w-[79%]"></div>
                <div className="w-[80%]"></div>
                <div className="w-[81%]"></div>
                <div className="w-[82%]"></div>
                <div className="w-[83%]"></div>
                <div className="w-[84%]"></div>
                <div className="w-[85%]"></div>
                <div className="w-[86%]"></div>
                <div className="w-[87%]"></div>
                <div className="w-[88%]"></div>
                <div className="w-[89%]"></div>
                <div className="w-[90%]"></div>
                <div className="w-[91%]"></div>
                <div className="w-[92%]"></div>
                <div className="w-[93%]"></div>
                <div className="w-[94%]"></div>
                <div className="w-[95%]"></div>
                <div className="w-[96%]"></div>
                <div className="w-[97%]"></div>
                <div className="w-[98%]"></div>
                <div className="w-[99%]"></div>
                <div className="w-[100%]"></div>
            </div>
        </div>
    );
};

export default SongBar;
