// components/AuthModal.jsx
import React from "react";
import { Link } from "react-router-dom";

const AuthModal = ({ onClose, song  }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gradient-to-br from-[#191414] to-[#000000] p-8 rounded-lg w-[90%] max-w-md text-white relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
            {song?.img && (
                <div className="h-40 flex items-center justify-center bg-black rounded-lg overflow-hidden">
                    <img src={song.img} className="h-full object-contain" alt="Song Cover" />
                </div>
            )}          
            <h2 className="text-xl font-bold">Start listening with a free account</h2>
          <button className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-full w-full">
            <Link to={"/signup"} >
            Sign up for free
            </Link>
          </button>
          <button className="bg-transparent border border-gray-400 text-white py-2 px-4 rounded-full w-full">
            Download app
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="underline cursor-pointer text-green-400" >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
