const express = require("express");
const { connectMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

const URL = require('./models/url')

connectMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDb connected");
});

const app = express();
const PORT = 8002;

app.use(express.json()); // used to parse body
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },{
           $push:{
            visitHistory:{
                timestamp: Date.now()
            }
           }
        }
    )
    res.redirect(entry.redirectURL)
})

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
