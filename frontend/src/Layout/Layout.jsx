{/*import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="flex gap-2">
            <Sidebar />
            <div className="w-3/4 absolute -z-10 right-0 top-0 ml-8">
                {children}
            </div>
        </div>
    );
};

export default Layout;


import Sidebar from "../components/Sidebar/Sidebar";
const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};
export default Layout;
*/}

// Layout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="grid-layout">
      
      <Sidebar />
      <div className="main-view rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;
