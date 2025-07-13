import React, {useState,useEffect} from "react";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { userActor } from "../../states/Actors/UserActor";
import WhiteLogo from "../../assets/white_logo.png";
const Login = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.account);
    const [userDetails, setUserDetails] = useState({
            identifier: "",
            password: "",
        });
        const navigate = useNavigate();
    
        const loginUser = async (e) => {
            e.preventDefault();
            const { email, password } = userDetails;
            let d = JSON.stringify({
                username: userDetails.identifier,
                password: userDetails.password,
            });
            console.log(d);
            const res = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: d,
            });
    
            const data = await res.json();
            if (data.success) {
                  console.log(data);
                  toast.success(data.message);
                  localStorage.setItem("token", JSON.stringify(data.token));
                  localStorage.setItem("user", JSON.stringify(data.user));
                  dispatch(userActor(data.user));
                  navigate("/");
                } else {
                  toast.error(data.message);
                }
        };
        const onChange = (e) => {
            setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        };
        useEffect(() => {
            if (isAuthenticated) {
              navigate("/");
            }
          }, []);
     return (
        <div 
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                        background: "linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgb(0, 0, 0) 100%)",
                    }}>
            <div className=" w-full max-w-md p-8 rounded-lg shadow-xl text-center"
                style={{
                        background: "linear-gradient(rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0.1) 100%)"
                        }}>

                <img src={WhiteLogo} className="mx-auto mb-6" width={80} alt="Spotify" />
                <h1 className="text-2xl font-bold text-white mb-6">Log in to Spotify</h1>

                <div className="border-t border-gray-700 my-6"></div>

                <form onSubmit={loginUser} className="text-left">
                    <label htmlFor="email" className="text-sm font-semibold text-white">
                        Email or username
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="identifier"
                        value={userDetails.identifier}
                        onChange={onChange}
                        placeholder="Email or username"
                        className="w-full mt-1 mb-4 p-3 bg-[#121212] text-white border border-gray-600 rounded focus:ring-2 focus:ring-green-500"
                    />

                    <label htmlFor="password" className="text-sm font-semibold text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userDetails.password}
                        onChange={onChange}
                        placeholder="Password"
                        className="w-full mt-1 mb-6 p-3 bg-[#121212] text-white border border-gray-600 rounded focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#1ed760] text-black font-bold py-3 rounded-full hover:scale-105 transition-transform"
                    >
                        Log In
                    </button>
                </form>

                <div className="mt-4 text-sm text-center">
                    <Link to="/password/forgot" className="text-white underline">
                        Forgot your password?
                    </Link>
                </div>

                <div className="border-t border-gray-700 my-6"></div>

                <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-white underline">
                        Sign up for Spotify
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
