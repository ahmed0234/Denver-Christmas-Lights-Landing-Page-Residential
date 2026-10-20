import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Denver Christmas Lights",
    short_name: "Denver Lights",
    description:
      "Professional residential Christmas light installation in Denver.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#cc0000",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
