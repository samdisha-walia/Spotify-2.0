const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default:"user"
  },
  DOB: {
    type: Date,
    required: true,
  },
  playlists:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playlist",
    },
      
    ],
  
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
