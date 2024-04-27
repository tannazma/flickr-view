import express, { Request, Response } from "express";
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
app.get("/api/photos", async (req: Request, res: Response) => {
  const tags = req.query.tags || "";
  const apiUrlForFetchingImages = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${encodeURIComponent(
    String(tags)
  )}`;
  // console.log(apiUrlForFetchingImages);

  try {
    const response = await fetch(apiUrlForFetchingImages);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: any = await response.json();

    // simplify the data before sending it back
    const simplifiedData = data.items.map((item: any) => ({
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
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ Server listening on port: ${PORT}`);
});
