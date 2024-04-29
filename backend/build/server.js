var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
// Route to fetch images
// I have 2 functionalities for my API: to fetch all images: /api/photos and fetch based on the tages: /api/photos?tags="something"
app.get("/api/photos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = req.query.tags || "";
    const apiUrlForFetchingImages = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${encodeURIComponent(String(tags))}`;
    // console.log(apiUrlForFetchingImages);
    try {
        const response = yield fetch(apiUrlForFetchingImages);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        // simplify the data before sending it back
        const simplifiedData = data.items.map((item) => ({
            title: item.title,
            imageURL: item.media.m,
            author: item.author,
            link: item.link,
            description: item.description,
            tags: item.tags,
            published: item.published,
        }));
        // console.log("simplifiedData", simplifiedData);
        // console.log("data", data);
        res.json(simplifiedData);
    }
    catch (error) {
        console.error("Failed to fetch data:", error);
        res
            .status(500)
            .json({ error: "Failed to fetch data", details: error.message });
    }
}));
app.listen(PORT, () => {
    console.log(`⚡ Server listening on port: ${PORT}`);
});
