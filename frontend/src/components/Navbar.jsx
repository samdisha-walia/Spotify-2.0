import React, { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaExternalLinkAlt,
  FaLink,
  FaSearch,
  FaUser,
  FaHome,
  FaPlus,
} from "react-icons/fa";

import {  BiSolidHome } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { songs_mp } from "../data/songs_mp";
import { useGlobalContext } from "../states/Context";
import { logOutUser } from "../states/Actors/UserActor";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const { setFilteredSongs } = useGlobalContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const location = useLocation();

  const filterSongs = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
    const fil = songs_mp.filter((song) => {
      console.log(song);
      if (
        song.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        song.artist.toLowerCase().includes(e.target.value.toLowerCase())
      )
        return song;
    });
    console.log(fil);
    if (e.target.value === "") setFilteredSongs([]);
    else setFilteredSongs(fil);
  };
 
  const logoutUser = () => {

      localStorage.removeItem('token');
      dispatch(logOutUser());
      navigate('/');
  
  }
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <header 
    className="w-full sticky top-0 z-50 bg-black h-[64px] px-4 sm:px-6 flex items-center justify-between "
    id="global-nav-bar">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          {/* Use your own logo or replace src */}
          <img src="/white_logo.png" alt="Spotify" className="h-8" />
        </Link>
        <Link to="/" className="text-white flex items-center gap-2 hover:text-green-500">
          <FaHome />
          <span className="hidden sm:inline text-sm font-medium">Home</span>
        </Link>

        <Link to="/search" className="text-white flex items-center gap-2 hover:text-green-500">
          <FiSearch />
          <span className="hidden sm:inline text-sm font-medium">Search</span>
        </Link>
      </div>
     
      <div className="flex gap-2 items-center  w-1/2">
        
        <div
          className={`${
            location.pathname !== "/search" ? "opacity-0" : ""
          } w-full text-left py-4 relative`}
        >
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Search"
            autoComplete="off"
            value={query}
            onChange={filterSongs}
            className={`block  w-full rounded-full pl-12 border-0  text-gray-300 shadow-sm ring ring-transparent placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white outline-none p-3 hover:ring-white/20 bg-[#1a1919]`}
          />
          <FaSearch className="absolute left-4 top-8" />
        </div>
      </div>

      <div>
        {!isAuthenticated ? (
          <div>
            <Link
              to={"/signup"}
              className="rounded-full  mt-4 px-8 text-base  py-2 text-white font-semibold"
            >
              Sign Up
            </Link>

            <Link
              to={"/login"}
              className="rounded-full text-black mt-4 px-8 text-base  py-3 bg-white font-semibold"
            >
              Log in
            </Link>
          </div>
        ) : (
          <div className="relative ">
            <button onClick={() => setShowDropDown(!showDropDown)}>
              <FaUser />
            </button>
            {showDropDown && (
              <div className="absolute dropdown bg-[#282828] top-8 text-sm right-0 w-[12rem]">
                <ul className="p-1">
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Account</span> <FaExternalLinkAlt />
                    </Link>{" "}
                  </li>
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Profile</span>{" "}
                    </Link>{" "}
                  </li>
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Upgrade to Premium</span> <FaExternalLinkAlt />
                    </Link>{" "}
                  </li>
                  <li className="">
                    <Link
                      className="flex p-2 justify-between hover:bg-white/10"
                      to={"/account"}
                    >
                      <span>Settings</span>
                    </Link>{" "}
                  </li>
                  <li className="">
                    <button
                      onClick={logoutUser}
                      className="p-2 w-full text-left border-t border-white/10  hover:bg-white/10"
                    >
                      <span>Log out</span>
                    </button>{" "}
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
