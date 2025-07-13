import React, { useEffect, useState } from 'react';
import { BiLibrary, BiSolidHome } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import {FaPlus} from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import Signup from './Signup';
import "./Sidebar.css"
import ArijitImage from "../../assets/Arijit.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";







const Sidebar = () => {
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("Sidebar: raw localStorage user:", storedUser);
        try {
            const parsedUser = storedUser ? JSON.parse(storedUser) : null;
            console.log("Sidebar: parsed user:", parsedUser);
        } catch (e) {
            console.log("Failed to parse user:", e);
        }
    }, []);


    const handleCreatePlaylist = async () => {
            const title = prompt("Enter playlist name:");
            
            if (!title) return;

            const rawUser = localStorage.getItem("user");
            const user = rawUser ? JSON.parse(rawUser) : null;


            console.log("User from localStorage:", user);

            if (!user || !user._id ){
                alert("User not logged in.");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/api/playlist/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, singers: [], songs: [],userId: user._id, }),
                });

                const data = await res.json();

                if (data.success) {
                    localStorage.setItem("user", JSON.stringify(data.user)); // <-- This is critical
                    localStorage.setItem("token", data.token)
                    navigate("/");
                setPlaylists((prev) => [...prev, data.playlist]);
                } else {
                alert("Failed to create playlist: " + data.message);
                }
            } catch (err) {
                console.error("Create playlist error:", err);
                alert("Error creating playlist.");
            }
            };

    const getPlaylists = async () => {
        const res = await fetch("http://localhost:5000/api/playlist/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        let d = await res.json();
        console.log(d);
        setPlaylists(d.playlists);
    };
    useEffect(() => {
        getPlaylists();
    }, []);
  return (
    <div className='sidebar'>
        {/*<div className="nav secondary-bg rounded-lg p-6">
            <Link to={"/"} className="flex items-center gap-4">
                <BiSolidHome className="font-bold text-xl" />
                <span className="text-lg">
                    Home
                </span>
            </Link >

            <Link to ={"/search"} className="flex mt-4 items-center gap-4">
                <FiSearch className="font-bold text-xl" />
                <span className="text-lg">
                    Search
                </span>
            </Link>
        </div>*/}


        <div className="mt-2 secondary-bg rounded-lg px-2 py-2">
            <div className="flex px-4 justify-between mb-4 items-center gap-4">
                <div className='flex gap-2 items-center'>
                    <BiLibrary className="font-bold text-xl" />
                        <span>
                            Your Library
                        </span>
                    </div>
                    <button onClick={handleCreatePlaylist} 
                    
                    className="hover:bg-black/25 w-10 h-10 rounded-[50%] p-2">
                        <FaPlus className="font-bold text-xl"/>
                    </button>
                </div>
                <div className="btns flex gap-4 mb-4">
                    <Link
                    to={"/"}
                    className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm"
                    >
                    Playlists
                    </Link>
                    <Link
                    to={"/"}
                    className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm"
                    >
                    Artists
                    </Link>
                </div>
                <div className="my-6 px-2">
                    {playlists.map((p) => (
                        <Link to={`/playlist/${p._id}`} key={p._id} className="flex gap-4 my-2">
                            <div>
                                <img src={ArijitImage} width={50} height={50} alt="" />
                            </div>
                            <div>
                                <h3 className="text-base font-medium mb-2">{p.title}</h3>
                                <p className="text-sm text-white/80">
                                Playlist<span> • {p.songs.length} Songs</span>
                                </p>
                            </div>
                        </Link>

                        ))}

                </div>
             <div className="your_library">
            <div className="bg-[#121212] rounded-md p-4 my-2">
                <h3 className='font-semibold'>Create your first playlist</h3>
                <p className='text-sm text-gray-400'>It's easy, we'll help you</p>
                    <button onClick={handleCreatePlaylist} className="bg-white text-black rounded-full px-4 py-2 mt-2 font-semibold text-sm">
                        Create Playlist
                    </button>
            </div>
            <div className="bg-[#121212] rounded-md p-4 my-2">
                <p className='font-semibold'>Let's find some podcasts to follow</p>
                <p className='text-sm text-gray-400'>We'll keep you updated on new episodes</p>
                    <button className="bg-white text-black rounded-full px-4 py-2 mt-2 font-semibold text-sm">
                        Browse Podcasts
                    </button>
            </div>
        </div>

        <div className='pt-44'>
        <div className="mt-4 px-4 flex gap-4 flex-wrap">
            <a className='text-xs text-gray-300' href="#">Legal</a>
            <a className='text-xs text-gray-300' href="#">Privacy Center</a>
            <a className='text-xs text-gray-300' href="#">Privacy Policy</a>
            <a className='text-xs text-gray-300' href="#">Cookies</a>
            <a className='text-xs text-gray-300' href="#">About Ads</a>
            <a className='text-xs text-gray-300' href="#">Accessibility</a>
        </div>

        <button className='mx-4 mt-1 w-[120px] text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center text-white'>
            <TbWorld />
            <span className="text-white font-bold">English</span>
        </button>
        </div>
        </div>
        {/* <Signup /> */}
    </div>
  );
}

export default Sidebar;