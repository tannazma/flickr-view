import express, { Request, Response } from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Route to fetch images
app.get("/api/photos", async (req: Request, res: Response) => {
  const tags = req.query.tags;
  const apiUrlForFetchingImages = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${encodeURIComponent(
    String(tags)
  )}`;

  try {
    const response = await fetch(apiUrlForFetchingImages);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
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
