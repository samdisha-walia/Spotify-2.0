
# 🎧 Spotify 2.0 – Music Streaming Web App

A full-featured **Spotify Clone** built using **React.js**, **Redux Toolkit**, **Tailwind CSS**, and **React Router**, replicating the modern Spotify user experience. It supports dynamic music playback, responsive UI, authentication routes, and global state management.

> ⚠️ *This is a portfolio/demo project intended for learning and personal showcasing purposes. All music files and assets used are placeholders.*



## 🔥 Key Features

✅ Beautiful and responsive design with Tailwind CSS  
✅ Login & Signup pages with client-side routing  
✅ Dynamic playback system using HTML5 Audio API  
✅ Global state management with Redux Toolkit + Context API  
✅ Full-featured song bar with volume, play/pause, seek, and skip controls  
✅ Modular, scalable codebase using reusable components  
✅ Routing separation with authentication-ready layouts  
✅ Works across all major browsers and devices



## 🛠 Tech Stack

| Layer         | Technology Used                |
|---------------|--------------------------------|
| **Frontend**  | React.js, Tailwind CSS         |
| **Routing**   | React Router DOM               |
| **State**     | Redux Toolkit, React Context   |
| **Icons**     | React Icons                    |
| **Bundler**   | Vite                           |
| **Auth**      | JWT (JSON Web Token) via Axios |




## 📁 Project Structure

```plaintext
Spotify2.0/
├── backend/
│   ├── helper/         
│   │   ├── generateToken.js
│   ├── Modals/
│   │   ├── Playlist.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── Playlist.js
│   │   ├── user.js
│   ├── .env             
│   ├── .gitignore             
│   ├── app.js
|   ├── db.js            
│   ├── package-lock.json            
│   ├── package.json 
├── frontend/
|   ├── public/
|   │   └── assets/             # Static images, music, icons
|   ├── src/
|   │   ├── components/         # UI components
|   │   │   ├── Card/
|   │   │   ├── Footer/
|   │   │   ├── Home/
|   │   │   ├── Login/
|   │   │   ├── MasterBar/
|   │   │   ├── PlaylistPage/
|   │   │   ├── Search/
|   │   │   ├── Sidebar/
|   │   │   ├── Signup/ 
|   │   │   ├── AuthModal.jsx   
|   │   │   ├── Display.jsx  
|   │   │   ├── Navbar.jsx 
|   │   ├── data/
|   │   ├── Layout/             # Page layouts
|   │   ├── states/             # Redux + Context logic
|   │   │   ├── store.js
|   │   │   ├── Context.js
|   │   │   └── Actors/
|   │   ├── App.jsx             # Main app component
|   │   ├── index.css
|   │   ├── main.jsx
|   ├── tailwind.config.js
|   ├── vite.config.js
|   └── README.md
````



## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or above)
* npm or yarn

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/Samiksha-Walia/Spotify2.0.git

# Navigate into the project directory
cd Spotify2.0

# Install all dependencies
npm install

# Start the local development server
npm run dev
```

Your app will be live at `http://localhost:5173`.


## 🎵 Song Player Functionality

🎚️ Local audio playback with HTML5 Audio
🎛️ Volume control, time seek bar, and mute toggle
⏭️ Skip to next or previous track
⏯️ Play and pause with smooth transitions
🔁 Persistent playback using global state



## 🌱 Future Enhancements

* 🔐 Integrate JWT-based authentication system
* 🎶 Playlist creation and management features
* 🔎 Enhanced search with fuzzy matching
* ☁️ Backend integration using Node.js/Express or Firebase
* 🌓 Theme toggle for light/dark mode support
* 📱 Progressive Web App (PWA) support for mobile offline access


## 👤 Author

**Samiksha Walia**
[GitHub](https://github.com/Samiksha-Walia) • [LinkedIn](https://linkedin.com/in/samiksha-walia) 



## ⭐️ Support This Project

If you found this project helpful, please consider giving it a ⭐️ on GitHub to show your support.



> 📝 *UI inspired by Spotify. Built solely for educational and non-commercial use.*


