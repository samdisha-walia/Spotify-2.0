

# 🎧 Spotify Clone

A full-featured Spotify Clone built using **React.js**, **Redux**, **Tailwind CSS**, and **React Router**, replicating the core user experience of a music streaming platform with modern UI/UX, authentication routes, and dynamic song playback.


## 📌 Features

✅ Responsive UI with Tailwind CSS  
✅ Login & Signup pages with routing  
✅ Dynamic playback system using Audio API  
✅ Global state management with Redux & Context API  
✅ Song bar with play/pause/volume/seek controls  
✅ Functional next/prev track controls  
✅ Reusable components with a clean structure  
✅ Auth-ready layout and routing separation



## 🛠 Tech Stack

| Layer        | Tech Used                |
|--------------|--------------------------|
| **Frontend** | React.js, Tailwind CSS   |
| **Routing**  | React Router DOM         |
| **State**    | Redux Toolkit, Context API |
| **UI Icons** | React Icons              |
| **Build Tool** | Vite                   |



## 📁 Folder Structure

```

Spotify-Clone/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Card/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── Sidebar/
│   │   ├── MasterBar/ (SongBar)
│   ├── Layout/
│   ├── states/
│   │   ├── Context.js
│   │   ├── store.js
│   │   └── Actors/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── tailwind.config.js
├── vite.config.js
└── README.md

````



## 🚀 Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/Samiksha-Walia/Spotify2.0.git

# Navigate to the folder
cd Spotify2.0

# Install dependencies
npm install

# Start the development server
npm run dev
````



## 🎵 Song Player

* Supports local audio playback via HTML5 Audio.
* Volume, time progress, and play/pause toggles.
* Skip next/previous songs.
* Dynamic progress bar.
* State managed globally via Redux + custom context.


## 💡 Future Improvements

* 🎶 Add playlist management
* 🔐 JWT-based authentication
* 🌍 Backend integration (Node/Express or Firebase)
* 🔍 Better search with fuzzy logic
* 🎨 Dark/Light mode toggle



## 👤 Author

**Samiksha Walia**
[GitHub](https://github.com/Samiksha-Walia) • [LinkedIn](https://linkedin.com/in/samiksha-walia) 




> *UI inspired by Spotify. This is a clone project built for learning and demonstration purposes only.*
