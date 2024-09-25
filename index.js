const express = require("express");
const { connectMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

connectMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDb connected");
});

const app = express();
const PORT = 8001;

app.use("/url", urlRoute);
app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
