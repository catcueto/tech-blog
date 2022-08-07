const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log("Listening on PORT # http://localhost:3003");
});
