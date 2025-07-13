import React,{useState, useEffect} from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./signup.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import WhiteLogo from "../../assets/white_logo.png";
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Signup = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        day: "",
        month: "",  
        year: "",
        password: "",
        gender: "", 
    });
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.account);

    const registerUser = async (e) => {
        e.preventDefault();
        console.log(userDetails);
        const index = months.indexOf(userDetails.month);
        const month = (index + 1).toString().padStart(2, '0');
        const day = userDetails.day.toString().padStart(2, '0');
        const DOB = `${userDetails.year}-${month}-${day}`;
        const { email, password, gender, username } = userDetails;
        let d = JSON.stringify({
        email,
        password,
        gender,
        DOB,
        username,
        });
        console.log(d);
        const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: d,
        });

        const data = await res.json();
        if (data.success) {
              setUserDetails({
                email: "",
                day: "",
                username: "",
                year: "",
                month: "",
                password: "",
                gender: "",
              });
              toast.success(data.message);
              navigate("/");
              localStorage.setItem("token", data.token);
            } else {
              toast.error(data.message);
            }
        console.log(data);
    };
    const onChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        if (e.target.name === "gender") {
        if (e.target.id === "m") {
            setUserDetails({ ...userDetails, gender: "M" });
        }
        if (e.target.id === "f") {
            setUserDetails({ ...userDetails, gender: "F" });
        }
        if (e.target.id === "o") {
            setUserDetails({ ...userDetails, gender: "O" });
        }
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
          navigate("/");
        }
      }, []);

    return (
        <>
            <div>
                <div className="logo mt-2 text-center">
                    <Link to="/">
                        <img
                            src={WhiteLogo}
                            className="mx-auto"
                            width={140}
                            alt=""
                        />
                    </Link>
                </div>
                <div className=" text-white">
                    <div className="text-center mx-auto">
                        <h1 className="text-3xl tracking-tighter my-4 font-semibold">
                            Sign up for free to start listening.
                        </h1>
                        
                        <form 
                            onSubmit={registerUser}
                            className="text-center mx-auto  ">
                            <div className=" mx-auto text-left ">
                                <label
                                    htmlFor="email"
                                    className="font-semibold mb-2 text-sm inline-block"
                                >
                                    What's your email?{" "}
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={userDetails.email}
                                    onChange={onChange}
                                    placeholder="Enter your email"
                                    className="block w-full rounded-md border border-gray-700 bg-black text-white placeholder:text-gray-400 focus:bg-black focus:text-white focus:placeholder:text-gray-500 transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none p-3"
                                />
                            </div>
                            <div className=" mx-auto text-left ">
                                <label
                                    htmlFor="password"
                                    className="font-semibold mb-2 text-sm inline-block"
                                >
                                    Create a password{" "}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={userDetails.password}
                                    onChange={onChange}
                                    placeholder="Create a password"
                                    className="block w-full rounded-md border border-gray-700 bg-black text-white transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none p-3"
                                />
                            </div>
                            <div className=" mx-auto text-left ">
                                <label
                                    htmlFor="username"
                                    className="font-semibold mb-2 text-sm inline-block"
                                >
                                    What should we call you?{" "}
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={userDetails.username}
                                    onChange={onChange}
                                    className="block w-full rounded-md border border-gray-700 bg-black text-white transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none p-3"
                                />
                                <small>it will appear on your profile</small>
                            </div>
                            <div className="text-left"></div>
                            <div className=" mx-auto text-left ">
                                <label
                                    htmlFor="date"
                                    className="font-semibold mb-2 text-sm inline-block"
                                >
                                    What's your date of birth?
                                </label>
                                <div className="flex gap-8">
                                    <div className="w-1/4">
                                        <label
                                            htmlFor="day"
                                            className="ml-2 inline-block"
                                        >
                                            Day
                                        </label>
                                        <input
                                            type="text"
                                            id="day"
                                            name="day"
                                            value={userDetails.day}
                                            onChange={onChange}
                                            placeholder="DD"
                                            className="block w-full rounded-md border border-gray-700 bg-black text-white placeholder:text-gray-400 focus:text-white focus:placeholder:text-gray-500 transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none p-3"
                                        />
                                    </div>
                                    <div className="w-2/4">
                                        <label
                                            htmlFor="month"
                                            className="ml-2 inline-block"
                                        >
                                            Month
                                        </label>
                                        <select
                                            type="radio"
                                            id="month"
                                            name="month"
                                            value={userDetails.month}
                                            onChange={onChange}
                                            placeholder="MM"
                                            className="block w-full rounded-md border border-gray-700 bg-black text-white transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none p-3"
                                        >
                                            {months.map((m) => {
                                                return (
                                                    <option key={m} value={m}>
                                                        {m}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="w-1/4">
                                        <label
                                            htmlFor="year"
                                            className="ml-2 inline-block"
                                        >
                                            Year
                                        </label>
                                        <input
                                            type="text"
                                            id="year"
                                            name="year"
                                            value={userDetails.year}
                                            onChange={onChange}
                                            placeholder="YYYY"
                                            className="block w-full rounded-md border border-gray-700 bg-black text-white transition-all duration-200 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 outline-none p-3"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-8 mt-4">
                                    <div className="">
                                        <input
                                            type="radio"
                                            id="m"
                                            name="gender"
                                            placeholder="gender"
                                            value={userDetails.gender}
                                            checked={userDetails.gender === "M"}
                                            onChange={onChange}
                                            className=""
                                        />
                                        <label
                                            htmlFor="m"
                                            className="ml-2 inline-block"
                                        >
                                            Male
                                        </label>
                                    </div>
                                    <div className="">
                                        <input
                                            type="radio"
                                            id="f"
                                            name="gender"
                                            value={userDetails.gender}
                                            checked={userDetails.gender === "F"}
                                            onChange={onChange}
                                            placeholder="gender"
                                            className=""
                                        />
                                        <label
                                            htmlFor="f"
                                            className="ml-2 inline-block"
                                        >
                                            Female
                                        </label>
                                    </div>
                                    <div className="">
                                        <input
                                            type="radio"
                                            id="o"
                                            name="gender"
                                            value={userDetails.gender}
                                            checked={userDetails.gender === "O"}
                                            onChange={onChange}
                                            placeholder="gender"
                                            className=""
                                        />
                                        <label
                                            htmlFor="o"
                                            className="ml-2 inline-block"
                                        >
                                            Prefer not to say
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className=" mx-auto text-left ">
                                <div className="my-4 flex items-center gap-4" >
                                    <input
                                        type="checkbox"
                                        className="green-checkbox relative"
                                        name="marketing_opt_out"
                                        id="marketing_opt_out"
                                    />
                                    <p className="text-sm">
                                        I would prefer not to receive marketing
                                        messages from Spotify
                                    </p>
                                </div>
                                <div className="my-4 flex items-center gap-4" >
                                    <input
                                        type="checkbox"
                                        className="green-checkbox relative"
                                        name="share_registration_data"
                                        id="share_registration_data"
                                    />
                                    <p className="text-sm">
                                    Share my registration data with Spotify's content providers for marketing purposes.
                                    </p>
                                </div>
                                <p className="my-4 text-xs">
                                    By clicking on sign-up, you agree to{" "}
                                    <Link to="/" className="text-green-400">
                                        Spotify's Terms and Condition
                                    </Link>{" "}
                                    of Use.
                                </p>
                                <p className="my-4 text-xs">
                                    To learn more about how Spotify collects,
                                    uses, shares and protects your personal
                                    data, please see
                                    <Link to="/" className="text-green-400">
                                        Spotify's Privacy Policy.
                                    </Link>{" "}
                                </p>
                            </div>

                            <div className="w-full text-left ">
                                <input
                                    type="submit"
                                    value="Sign up"
                                    className="block cursor-pointer w-1/2 mx-auto outline-none bg-green-400 text-black p-3 hover:scale-105 translate-all duration-200 font-medium hover:font-semibold text-center rounded-full "
                                />
                            </div>
                        </form>
                        <p className="pt-5">
                            <span className="text-gray-300 font-semibold">
                                Don't have an account?{" "}
                            </span>

                            <Link
                                to="/login"
                                className="text-green-400 hover:text-green-400/90 font-semibold underline mx-auto"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
