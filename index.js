const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")
const { connectMongoDB } = require("./connection");
const {restrictToLoggedinUserOnly} = require("./middlewares/auth")

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")

const URL = require("./models/url");

connectMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDb connected");
});

const app = express();
const PORT = 8002;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: "false" }));
app.use(express.json()); // used to parse body
app.use(cookieParser())


app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute)
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

// used try and catch to catch the error its better to use try & catch but it feels messy for me

// app.get('/:shortId', async (req, res) => {
//     try {
//         const shortId = req.params.shortId;
//         const entry = await URL.findOneAndUpdate(
//             { shortId },
//             {
//                 $push: {
//                     visitHistory: {
//                         timestamp: Date.now(),
//                     },
//                 },
//             },
//             { new: true } // This option returns the updated document
//         );

//         if (!entry) {
//             return res.status(404).send('URL not found');
//         }

//         res.redirect(entry.redirectURL);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
