import Layout from "../../Layout/Layout";
import React, { useState } from "react";
import { FaGreaterThan, FaLessThan, FaUser  } from "react-icons/fa";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import SongBar from "../MasterBar/SongBar";
import { songs_mp } from "../../data/songs_mp";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userActor } from "../../states/Actors/UserActor";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Context";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Signup from "../Sidebar/Signup";
import AuthModal from "../AuthModal";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";



const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const { getUser } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  
    useEffect(() => {
      if (!user) {
        getUser();
      }
    }, []);
    return (
    <>
    <Navbar />
        <Layout>
              
        
              <div >
                <div className="flex gap-2 items-center  w-1/2">
                  <FaAngleLeft className="bg-white/10 text-3xl p-1  rounded-[50%] " />
                  <FaAngleRight className="bg-white/10 text-3xl p-1  rounded-[50%] " />
                </div>
                <div className="flex justify-between mb-4 pt-4 items-center">
                  <span className="text-xl font-bold hover:underline cursor-pointer">
                    Focus
                  </span>
                  <span>Show All</span>
                </div>
                <div className="grid  gap-6 grid-cols-5">
                  {songs_mp.map((song, i) => {
                    return <Card key={song.id} idx={i} song={song} isAuthenticated={isAuthenticated} setShowModal={setShowModal} setSelectedSong={setSelectedSong}  />;
                  })}
                </div>
                <div className="flex justify-between my-4 items-center">
                  <span className="text-xl font-bold hover:underline cursor-poiSnter">
                    Spotify List
                  </span>
                  <span>Show All</span>
                </div>
                <div className="grid  gap-6 grid-cols-5">
                  {songs_mp.map((song, i) => {
                    return <Card key={song.id} idx={i} song={song} isAuthenticated={isAuthenticated} setShowModal={setShowModal} setSelectedSong={setSelectedSong} />;
                  })}
                </div>
              </div>
              <Footer/>
              {isAuthenticated ? <SongBar /> : <Signup />}
              {!isAuthenticated && showModal && (
                <AuthModal song={selectedSong} onClose={() => setShowModal(false)} />
)}

            </Layout>
            </>
    );
};

export default Home;
