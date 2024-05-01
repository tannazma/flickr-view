# Project Overview
This web application is a dynamic Flickr feed viewer and search tool, built with TypeScript, NodeJS with Express, and Next.js. It efficiently displays images from Flickr's public feeds in a responsive layout using Tailwind CSS for styling. Users can search for photos by keywords and toggle between list or grid views. 

## Technologies Used
Backend: Node.js, Express
Frontend: Next.js, React
Styling: Tailwind CSS,

## Project Structure
For a full-stack application using Next.js, organize the project into several key directories:

- `backend` _ Express.js directory for backend
    - `server` _ includeed 2 endponts for `/api/photos` that handle both searching keyword tags and fetching data from the Flickr feeds, and `/` 
- `Frontend` _ Next.js directory for frontend
    - `pages/` - Contains Next.js pages, such as page.tsx for the main feed and maybe search.tsx for search results.
    - `components/` - Reusable components like PhotoGrid, PhotoGridItems, PhotoList and PhotoListItem.
    - `public/` - Static assets like images and favicon.
    - `styles/` - Global styles and Tailwind configuration files.
    - `types/` _ reusable type for Picture

Backend Setup
* Create an Express server within Next.js application using the API routes feature of Next.js.
* Set up an API route like /api/photos to handle communication with the Flickr API.
* Use environment variables to store sensitive information like API keys securely: 

`NEXT_PUBLIC_BACKEND_URL` is set in `.env.local` for development and properly secured for production.

* Fetching Data from Flickr:
Use `node-fetch` for making HTTP requests to the Flickr API.

## Local Development Setup:
To run this project locally, follow these steps:
1. Clone the repository: 

```bash 
git clone https://github.com/tannazma/flickr-feed-viewer.git
```
2. Install dependencies:

```bash
cd flickr-feed-viewer
npm install
```
3. Set up environment variables:
- Rename `.env.example` to `.env.local`
- Fill in the `NEXT_PUBLIC_FLICKR_API_KEY` with your API key.
4. Run the development server:

```bash
npm run dev
```
Access the app at `http://localhost:3000`.


## Choosing <img/> Over <Image/> for Public Flickr API Integration

I chose the `<img/>` tag over Next.js's `<Image/>` component because the public Flickr API provides free, unoptimized images. This approach avoids the complexities and costs of setting up image optimization on a third-party server. Using `<img/>` ensures straightforward integration and direct access to images without extra processing or expense. 

### Good to Know
Using Suspense in my React application helps manage slow loading times, like the 276ms delay due to using the <img/> for fetching images. By displaying a fallback UI such as a loading spinner until the images are fully loaded, Suspense prevents users from seeing a blank screen and provides a smoother, more engaging experience while waiting for data from the API.

## Deployment
Deploy the backend on Render and the frontend on Vercel for optimal Next.js performance. Use `.env.local` for local settings and upload the variable to Vercel's Environment Variables section for secure and efficient configuration management across deployments.

## Live Demo
Check out the live demo of the project here: [Flickr View](https://flickr-view.vercel.app)
