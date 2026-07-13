const express = require("express");
const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is listening on a port ${PORT}`);
});
