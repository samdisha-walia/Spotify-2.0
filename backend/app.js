require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000 || process.env.PORT;
require("./db");

app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/user"));
app.use("/api/playlist", require("./routes/playlist"));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
