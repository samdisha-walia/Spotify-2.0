const express = require("express");
const Playlist = require("../Models/Playlist");
const User = require("../Models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  const playlists = await Playlist.find();
  res.json({ playlists, success: true, message: "playlists found" });

});
router.post("/like", async (req, res) => {
  try {
    const { song_mp3, song_title, song_artist, song_thumbnail, userId } = req.body;

    if (!song_mp3 || !song_title || !song_artist || !userId) {
      return res.status(400).json({
        success: false,
        message: "All song fields are required.",
      });
    }

    // Find existing playlist or create new
    let playlist = await Playlist.findOne({ title: "Liked Songs" });

    if (!playlist) {
      playlist = new Playlist({
        title: "Liked Songs",
        singers: [], // optional
        songs: [],
        user: userId,
      });
    }

    // Check if song is already in liked list (optional)
    const alreadyLiked = playlist.songs.some(
      (s) => s.song_mp3 === song_mp3
    );
    if (alreadyLiked) {
      return res.status(409).json({
        success: false,
        message: "Song already liked.",
      });
    }

    // Push the song
    playlist.songs.push({
      song_mp3,
      song_title,
      song_artist,
      song_thumbnail,
    });

    await playlist.save();

    return res.status(200).json({
      success: true,
      message: "Song added to Liked Songs.",
      playlist,
    });
  } catch (err) {
    console.error("LIKE error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});


router.post("/create", async (req, res) => {
  try {
    const { singers, songs, title, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    // Step 1: Create playlist
    const playlist = await Playlist.create({
      singers,
      songs,
      title,
      user: userId, // ✅ attach user
    });

    // Step 2: Add playlist reference to user
    await User.findByIdAndUpdate(userId, {
      $push: { playlists: playlist._id },
    });

    res.json({ playlist, success: true, message: "Playlist created" });
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

     // Add base URL to song paths
    const formattedPlaylist = {
      ...playlist._doc,
      songs: playlist.songs.map(song => ({
        ...song,
        song_mp3: `http://localhost:5173/${song.song_mp3}`,
        song_thumbnail: `http://localhost:5173/${song.song_thumbnail}`,
        title: song.song_title,
        artist: song.song_artist
      }))
    };

    if (!playlist) {
      return res.status(404).json({ success: false, message: "Playlist not found" });
    }
    res.json({ success: true, playlist: formattedPlaylist });
  } catch (err) {
    console.error("Fetch playlist by ID error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
